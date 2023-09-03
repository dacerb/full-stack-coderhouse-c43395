import { Router } from 'express';
import * as ProductController from "../controllers/productControllers.js";
import {getProductsQueryWebFront} from "../controllers/productControllers.js";

const router = Router();

// router.get("/", ProductController.getProducts); old
router.get("/", ProductController.getProductsQueryWebFront);


export default router;