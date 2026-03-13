import { Novel, INovel } from '../models/novel.model';
import { Chapter, IChapter } from '../models/chapter.model';
import { generateSlug } from '../utils/slug';

export interface NovelQuery {
  page?: number;
  limit?: number;
  sort?: string;
  badge?: string;
  status?: string;
  category?: string;
  minChapters?: number;
  maxChapters?: number;
}

export const createNovel = async (input: {
  title: string;
  alternativeTitles?: string[];
  author?: string;
  description?: string;
  coverImage?: string;
  categories?: string[];
  status?: 'ongoing' | 'completed';
  badge?: 'hot' | 'vip' | 'full';
  isVIP?: boolean;
  isExclusive?: boolean;
}) => {
  const { title, ...rest } = input;

  // Generate unique slug
  let slug = generateSlug(title);
  const existingNovel = await Novel.findOne({ slug });
  if (existingNovel) {
    slug = `${slug}-${Date.now()}`;
  }

  const novel = await Novel.create({
    title,
    slug,
    ...rest
  });

  return novel;
};

export const getNovels = async (query: NovelQuery) => {
  const {
    page = 1,
    limit = 20,
    sort = 'newest',
    badge,
    status,
    category,
    minChapters,
    maxChapters
  } = query;

  const filter: Record<string, unknown> = {};

  if (badge) filter.badge = badge;
  if (status) filter.status = status;
  if (category) filter.categories = category;

  // Chapter count filter
  if (minChapters || maxChapters) {
    filter.chapterCount = {};
    if (minChapters) (filter.chapterCount as Record<string, number>).$gte = minChapters;
    if (maxChapters) (filter.chapterCount as Record<string, number>).$lte = maxChapters;
  }

  // Sort options
  let sortOption: Record<string, 1 | -1> = { createdAt: -1 };
  switch (sort) {
    case 'oldest':
      sortOption = { createdAt: 1 };
      break;
    case 'views':
      sortOption = { views: -1 };
      break;
    case 'chapters':
      sortOption = { chapterCount: -1 };
      break;
    case 'rating':
      sortOption = { rating: -1 };
      break;
  }

  const skip = (page - 1) * limit;

  const [novels, total] = await Promise.all([
    Novel.find(filter)
      .populate('categories', 'name slug')
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),
    Novel.countDocuments(filter)
  ]);

  return {
    novels,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const getNovelBySlug = async (slug: string) => {
  const novel = await Novel.findOne({ slug }).populate('categories', 'name slug').lean();

  if (!novel) {
    throw new Error('Novel not found');
  }

  // Increment views
  await Novel.findByIdAndUpdate(novel._id, { $inc: { views: 1 } });

  return novel;
};

export const getNovelById = async (id: string) => {
  const novel = await Novel.findById(id).populate('categories', 'name slug').lean();

  if (!novel) {
    throw new Error('Novel not found');
  }

  return novel;
};

export const updateNovel = async (id: string, input: Partial<{
  title: string;
  alternativeTitles: string[];
  author: string;
  description: string;
  coverImage: string;
  categories: string[];
  status: 'ongoing' | 'completed';
  badge: 'hot' | 'vip' | 'full';
  isVIP: boolean;
  isExclusive: boolean;
}>) => {
  const novel = await Novel.findById(id);

  if (!novel) {
    throw new Error('Novel not found');
  }

  // Update slug if title changes
  if (input.title && input.title !== novel.title) {
    let slug = generateSlug(input.title);
    const existing = await Novel.findOne({ slug, _id: { $ne: id } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }
    (novel as unknown as INovel).slug = slug;
  }

  Object.assign(novel, input);
  await novel.save();

  return novel;
};

export const deleteNovel = async (id: string) => {
  const novel = await Novel.findById(id);

  if (!novel) {
    throw new Error('Novel not found');
  }

  // Delete all chapters
  await Chapter.deleteMany({ novel: id });

  // Delete novel
  await novel.deleteOne();

  return { message: 'Novel deleted successfully' };
};

// Chapter operations
export const createChapter = async (novelId: string, input: {
  chapterNumber: number;
  title?: string;
  content?: string;
  isVIP?: boolean;
}) => {
  const novel = await Novel.findById(novelId);

  if (!novel) {
    throw new Error('Novel not found');
  }

  // Check if chapter already exists
  const existingChapter = await Chapter.findOne({
    novel: novelId,
    chapterNumber: input.chapterNumber
  });

  if (existingChapter) {
    throw new Error('Chapter already exists');
  }

  const chapter = await Chapter.create({
    novel: novelId,
    ...input
  });

  // Update novel chapter count
  await Novel.findByIdAndUpdate(novelId, {
    $inc: { chapterCount: 1 }
  });

  return chapter;
};

export const getChapters = async (novelSlug: string) => {
  const novel = await Novel.findOne({ slug: novelSlug });

  if (!novel) {
    throw new Error('Novel not found');
  }

  const chapters = await Chapter.find({ novel: novel._id })
    .select('chapterNumber title views isVIP publishedAt')
    .sort({ chapterNumber: 1 })
    .lean();

  return {
    novel: {
      _id: novel._id,
      title: novel.title,
      slug: novel.slug,
      chapterCount: novel.chapterCount
    },
    chapters
  };
};

export const getChapterByNumber = async (novelSlug: string, chapterNumber: number) => {
  const novel = await Novel.findOne({ slug: novelSlug });

  if (!novel) {
    throw new Error('Novel not found');
  }

  const chapter = await Chapter.findOne({
    novel: novel._id,
    chapterNumber
  }).lean();

  if (!chapter) {
    throw new Error('Chapter not found');
  }

  // Increment chapter views
  await Chapter.findByIdAndUpdate(chapter._id, { $inc: { views: 1 } });

  return {
    novel: {
      _id: novel._id,
      title: novel.title,
      slug: novel.slug,
      chapterCount: novel.chapterCount
    },
    chapter
  };
};

export const updateChapter = async (
  novelSlug: string,
  chapterNumber: number,
  input: Partial<{
    title: string;
    content: string;
    isVIP: boolean;
  }>
) => {
  const novel = await Novel.findOne({ slug: novelSlug });

  if (!novel) {
    throw new Error('Novel not found');
  }

  const chapter = await Chapter.findOne({
    novel: novel._id,
    chapterNumber
  });

  if (!chapter) {
    throw new Error('Chapter not found');
  }

  Object.assign(chapter, input);
  await chapter.save();

  return chapter;
};

export const deleteChapter = async (novelSlug: string, chapterNumber: number) => {
  const novel = await Novel.findOne({ slug: novelSlug });

  if (!novel) {
    throw new Error('Novel not found');
  }

  const chapter = await Chapter.findOne({
    novel: novel._id,
    chapterNumber
  });

  if (!chapter) {
    throw new Error('Chapter not found');
  }

  await chapter.deleteOne();

  // Update novel chapter count
  await Novel.findByIdAndUpdate(novel._id, {
    $inc: { chapterCount: -1 }
  });

  return { message: 'Chapter deleted successfully' };
};

// Get hot novels
export const getHotNovels = async (limit = 10) => {
  return Novel.find({ badge: 'hot' })
    .sort({ views: -1 })
    .limit(limit)
    .lean();
};

// Get novels by category
export const getNovelsByCategory = async (categorySlug: string, query: NovelQuery) => {
  return getNovels({
    ...query,
    category: categorySlug
  });
};
