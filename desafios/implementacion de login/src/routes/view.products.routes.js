import { Router } from 'express';
import * as ProductController from "../controllers/product.controllers.js";
import {getProductsQueryWebFront} from "../controllers/product.controllers.js";

const router = Router();

// router.get("/", ProductController.getProducts); old
router.get("/", ProductController.getProductsQueryWebFront);


export default router;