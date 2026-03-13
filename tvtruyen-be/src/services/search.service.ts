import { Novel } from '../models/novel.model';
import type { NovelQuery } from './novel.service';

export interface SearchQuery extends NovelQuery {
  keyword?: string;
}

export const searchNovels = async (query: SearchQuery) => {
  const {
    page = 1,
    limit = 20,
    sort = 'newest',
    keyword,
    badge,
    status,
    category,
    minChapters,
    maxChapters
  } = query;

  const filter: Record<string, unknown> = {};

  // Text search
  if (keyword) {
    filter.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { alternativeTitles: { $regex: keyword, $options: 'i' } },
      { author: { $regex: keyword, $options: 'i' } }
    ];
  }

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

// Get rankings
export const getRankings = async (period: 'day' | 'week' | 'month' = 'day', limit = 10) => {
  // For now, return top novels by views
  // In production, you'd track views by period
  const novels = await Novel.find()
    .sort({ views: -1 })
    .limit(limit)
    .select('title slug views coverImage')
    .lean();

  return novels;
};
