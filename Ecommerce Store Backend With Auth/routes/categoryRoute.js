import { Router } from 'express';
import { getCategoryProduct, getAllCategories } from '../controllers/categoryController.js';

const router = Router();

router.get('/', getAllCategories)

router.get('/:name', getCategoryProduct);

export default router;