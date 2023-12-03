import { Router } from 'express';
import { uploaderThumbnails } from "../common/utils/utils.js";
import * as ProductController from "../controllers/product.controllers.js";
import {requiredRole} from "./utils/utils.js";
import errorHandler from "../services/errors/middlewares/error.handler.js"

const router = Router();

// GET all products by filters
router.get("/", ProductController.getProductsQuery);

// GET product by ID
router.get("/:pid", ProductController.getProductById);

// PUT Update product by id
router.put("/:pid", uploaderThumbnails.array('thumbnails'), requiredRole(['admin'], null), ProductController.updateProductById);

// DELETE a product by id
router.delete("/:pid", requiredRole(['admin'], null), ProductController.deleteProductById);

// POST create new product
router.post("/", uploaderThumbnails.array('thumbnails'),  requiredRole(['admin'], null),  ProductController.addNewProduct);

router.use(errorHandler)

export default router;