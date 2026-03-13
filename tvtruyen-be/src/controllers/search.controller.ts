import type { Response, NextFunction } from 'express';
import * as searchService from '../services/search.service';
import type { AuthRequest } from '../types';

export const search = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await searchService.searchNovels(req.query as searchService.SearchQuery);
    res.json({
      success: true,
      data: result.novels,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

export const getRankings = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const period = (req.params.period as 'day' | 'week' | 'month') || 'day';
    const novels = await searchService.getRankings(period);
    res.json({
      success: true,
      data: novels
    });
  } catch (error) {
    next(error);
  }
};
