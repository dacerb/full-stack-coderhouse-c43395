import {Router} from 'express';
import {requiredLoginSession} from "./utils/utils.js"
import {getProductsQueryWebFront as getProductsQueryWebFront1} from "../controllers/view.product.controller.js";

const router = Router();

// router.get("/", ProductController.getProducts); old
router.get("/", requiredLoginSession, getProductsQueryWebFront1);


export default router;