import type { Response, NextFunction } from 'express';
import * as categoryService from '../services/category.service';
import * as novelService from '../services/novel.service';
import type { AuthRequest } from '../types';

const getParam = (param: string | string[] | undefined): string => {
  return Array.isArray(param) ? param[0] : param || '';
};

export const createCategory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json({
      success: true,
      data: category,
      message: 'Category created successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryService.getCategories();
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryBySlug = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const slug = getParam(req.params.slug);
    const category = await categoryService.getCategoryBySlug(slug);
    const novels = await novelService.getNovelsByCategory(slug, { limit: 20 });
    res.json({
      success: true,
      data: {
        category,
        novels: novels.novels,
        pagination: novels.pagination
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = getParam(req.params.id);
    const category = await categoryService.updateCategory(id, req.body);
    res.json({
      success: true,
      data: category,
      message: 'Category updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = getParam(req.params.id);
    const result = await categoryService.deleteCategory(id);
    res.json({
      success: true,
      data: result,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getAuthors = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authors = await categoryService.getAuthors();
    res.json({
      success: true,
      data: authors
    });
  } catch (error) {
    next(error);
  }
};

export const getAuthorBySlug = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const slug = getParam(req.params.slug);
    const author = await categoryService.getAuthorBySlug(slug);
    res.json({
      success: true,
      data: author
    });
  } catch (error) {
    next(error);
  }
};

export const getTranslators = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const translators = await categoryService.getTranslators();
    res.json({
      success: true,
      data: translators
    });
  } catch (error) {
    next(error);
  }
};

export const getTranslatorBySlug = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const slug = getParam(req.params.slug);
    const translator = await categoryService.getTranslatorBySlug(slug);
    res.json({
      success: true,
      data: translator
    });
  } catch (error) {
    next(error);
  }
};
