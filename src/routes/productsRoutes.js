import { Router } from 'express';
import { uploaderThumbnails } from "../common/utils/utils.js";
import * as ProductController from "../controllers/productControllers.js";
import {getProductsQuery} from "../controllers/productControllers.js";

const router = Router();

// GET all products by filters
// router.get("/", ProductController.getProducts); old
router.get("/", ProductController.getProductsQuery);

// GET product by ID
router.get("/:pid", ProductController.getProductById);

// PUT Update product by id
router.put("/:pid", uploaderThumbnails.array('thumbnails'), ProductController.updateProductById);

// DELETE a product by id
router.delete("/:pid", ProductController.deleteProductById);

// POST create new product
router.post("/", uploaderThumbnails.array('thumbnails'), ProductController.createNewProduct);

export default router;