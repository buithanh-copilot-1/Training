import { Router } from 'express';
import * as searchController from '../controllers/search.controller';

const router = Router();

// Public routes
router.get('/search', searchController.search);
router.get('/rankings/:period?', searchController.getRankings);

export default router;
