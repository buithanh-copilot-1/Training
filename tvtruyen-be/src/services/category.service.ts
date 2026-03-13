import { Category, ICategory } from '../models/category.model';
import { Author } from '../models/author.model';
import { Translator } from '../models/translator.model';
import { generateSlug } from '../utils/slug';

export const createCategory = async (input: { name: string; description?: string; icon?: string }) => {
  let slug = generateSlug(input.name);
  const existing = await Category.findOne({ slug });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  const category = await Category.create({
    name: input.name,
    slug,
    description: input.description || '',
    icon: input.icon || 'fa-book'
  });

  return category;
};

export const getCategories = async () => {
  const categories = await Category.find().sort({ name: 1 }).lean();
  return categories;
};

export const getCategoryBySlug = async (slug: string) => {
  const category = await Category.findOne({ slug }).lean();
  if (!category) {
    throw new Error('Category not found');
  }
  return category;
};

export const updateCategory = async (id: string, input: { name?: string; description?: string; icon?: string }) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error('Category not found');
  }

  if (input.name && input.name !== category.name) {
    let slug = generateSlug(input.name);
    const existing = await Category.findOne({ slug, _id: { $ne: id } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }
    category.slug = slug;
    category.name = input.name;
  }

  if (input.description !== undefined) category.description = input.description;
  if (input.icon) category.icon = input.icon;

  await category.save();
  return category;
};

export const deleteCategory = async (id: string) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new Error('Category not found');
  }
  await category.deleteOne();
  return { message: 'Category deleted successfully' };
};

// Author services
export const createAuthor = async (input: { name: string; bio?: string; avatar?: string }) => {
  let slug = generateSlug(input.name);
  const existing = await Author.findOne({ slug });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  const author = await Author.create({
    name: input.name,
    slug,
    bio: input.bio || '',
    avatar: input.avatar || ''
  });

  return author;
};

export const getAuthors = async () => {
  const authors = await Author.find().sort({ name: 1 }).lean();
  return authors;
};

export const getAuthorBySlug = async (slug: string) => {
  const author = await Author.findOne({ slug }).lean();
  if (!author) {
    throw new Error('Author not found');
  }
  return author;
};

// Translator services
export const createTranslator = async (input: { name: string; description?: string; avatar?: string }) => {
  let slug = generateSlug(input.name);
  const existing = await Translator.findOne({ slug });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  const translator = await Translator.create({
    name: input.name,
    slug,
    description: input.description || '',
    avatar: input.avatar || ''
  });

  return translator;
};

export const getTranslators = async () => {
  const translators = await Translator.find().sort({ name: 1 }).lean();
  return translators;
};

export const getTranslatorBySlug = async (slug: string) => {
  const translator = await Translator.findOne({ slug }).lean();
  if (!translator) {
    throw new Error('Translator not found');
  }
  return translator;
};

// Update category novel count
export const updateCategoryNovelCount = async (categoryId: string) => {
  const { Novel } = await import('../models/novel.model');
  const count = await Novel.countDocuments({ categories: categoryId });
  await Category.findByIdAndUpdate(categoryId, { novelCount: count });
};
