import { Router } from 'express';
import { uploaderThumbnails } from "../common/utils/utils.js";
import * as TestImple from "../controllers/testImplementationProductsControllers.js";
import {getProductsQuery} from "../controllers/testImplementationProductsControllers.js";

const router = Router();

// GET all products by filters
router.get("/", TestImple.getProductsQuery);

// GET product by ID
router.get("/:pid", TestImple.getProductById);

// PUT Update product by id
router.put("/:pid", uploaderThumbnails.array('thumbnails'), TestImple.updateProductById);

// DELETE a product by id
router.delete("/:pid", TestImple.deleteProductById);

// POST create new product
router.post("/", uploaderThumbnails.array('thumbnails'), TestImple.createNewProduct);


export default router;