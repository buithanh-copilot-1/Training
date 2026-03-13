import { Router } from 'express';
import * as categoryController from '../controllers/category.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/categories', categoryController.getCategories);
router.get('/categories/:slug', categoryController.getCategoryBySlug);
router.get('/authors', categoryController.getAuthors);
router.get('/authors/:slug', categoryController.getAuthorBySlug);
router.get('/translators', categoryController.getTranslators);
router.get('/translators/:slug', categoryController.getTranslatorBySlug);

// Protected routes (admin only)
router.post('/categories', authenticate, authorize('admin'), categoryController.createCategory);
router.put('/categories/:id', authenticate, authorize('admin'), categoryController.updateCategory);
router.delete('/categories/:id', authenticate, authorize('admin'), categoryController.deleteCategory);

export default router;
