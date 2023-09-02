import { Router } from 'express';
import * as CartController from "../controllers/cartControllers.js";

const router = Router();

// GET Render WEB HTML CART
router.get("/:cid", CartController.getACartByIdWebFront);

export default router;