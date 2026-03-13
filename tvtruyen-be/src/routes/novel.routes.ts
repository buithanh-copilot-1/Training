import { Router } from 'express';
import * as novelController from '../controllers/novel.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createNovelSchema, updateNovelSchema, novelQuerySchema } from '../validators/novel.validator';
import { createChapterSchema, updateChapterSchema } from '../validators/chapter.validator';

const router = Router();

// Public routes
router.get('/', validate(novelQuerySchema), novelController.getNovels);
router.get('/hot', novelController.getHotNovels);
router.get('/:slug', novelController.getNovelBySlug);
router.get('/:slug/chapters', novelController.getChapters);
router.get('/:slug/chapters/:chapter', novelController.getChapterByNumber);

// Protected routes (admin only)
router.post('/', authenticate, authorize('admin'), validate(createNovelSchema), novelController.createNovel);
router.put('/:id', authenticate, authorize('admin'), validate(updateNovelSchema), novelController.updateNovel);
router.delete('/:id', authenticate, authorize('admin'), novelController.deleteNovel);

router.post('/:slug/chapters', authenticate, authorize('admin'), validate(createChapterSchema), novelController.createChapter);
router.put('/:slug/chapters/:chapter', authenticate, authorize('admin'), validate(updateChapterSchema), novelController.updateChapter);
router.delete('/:slug/chapters/:chapter', authenticate, authorize('admin'), novelController.deleteChapter);

export default router;
