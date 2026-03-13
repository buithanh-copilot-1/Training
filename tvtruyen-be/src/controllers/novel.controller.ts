import type { Response, NextFunction } from 'express';
import * as novelService from '../services/novel.service';
import type { AuthRequest } from '../types';

// Helper to get string param
const getParam = (param: string | string[] | undefined): string => {
  return Array.isArray(param) ? param[0] : param || '';
};

export const createNovel = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const novel = await novelService.createNovel(req.body);
    res.status(201).json({
      success: true,
      data: novel,
      message: 'Novel created successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getNovels = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await novelService.getNovels(req.query as novelService.NovelQuery);
    res.json({
      success: true,
      data: result.novels,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

export const getNovelBySlug = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const slug = getParam(req.params.slug);
    const novel = await novelService.getNovelBySlug(slug);
    res.json({
      success: true,
      data: novel
    });
  } catch (error) {
    next(error);
  }
};

export const updateNovel = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = getParam(req.params.id);
    const novel = await novelService.updateNovel(id, req.body);
    res.json({
      success: true,
      data: novel,
      message: 'Novel updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNovel = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = getParam(req.params.id);
    const result = await novelService.deleteNovel(id);
    res.json({
      success: true,
      data: result,
      message: 'Novel deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getChapters = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const slug = getParam(req.params.slug);
    const result = await novelService.getChapters(slug);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getChapterByNumber = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const slug = getParam(req.params.slug);
    const chapterParam = getParam(req.params.chapter);
    const chapterNumber = parseInt(chapterParam);
    const result = await novelService.getChapterByNumber(slug, chapterNumber);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const createChapter = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const slug = getParam(req.params.slug);
    const novel = await novelService.getNovelBySlug(slug);
    const chapter = await novelService.createChapter(
      (novel._id as unknown as { toString: () => string }).toString(),
      req.body
    );
    res.status(201).json({
      success: true,
      data: chapter,
      message: 'Chapter created successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const updateChapter = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const slug = getParam(req.params.slug);
    const chapterParam = getParam(req.params.chapter);
    const chapterNumber = parseInt(chapterParam);
    const chapter = await novelService.updateChapter(
      slug,
      chapterNumber,
      req.body
    );
    res.json({
      success: true,
      data: chapter,
      message: 'Chapter updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const deleteChapter = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const slug = getParam(req.params.slug);
    const chapterParam = getParam(req.params.chapter);
    const chapterNumber = parseInt(chapterParam);
    const result = await novelService.deleteChapter(slug, chapterNumber);
    res.json({
      success: true,
      data: result,
      message: 'Chapter deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getHotNovels = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const novels = await novelService.getHotNovels();
    res.json({
      success: true,
      data: novels
    });
  } catch (error) {
    next(error);
  }
};
