import { Router } from "express";
import { getProducts, getSingleProduct, getRelatedProducts } from "../controllers/productController.js";

const router = Router();

router.get('/', getProducts);

router.get('/:id/related', getRelatedProducts);

router.get('/:id', getSingleProduct);

export default router;