import { Router } from 'express';
import * as ProductController from "../controllers/productControllers.js";

const router = Router();

// router.get("/", ProductController.getProducts); old
router.get("/", ProductController.getProductsQuery);


export default router;