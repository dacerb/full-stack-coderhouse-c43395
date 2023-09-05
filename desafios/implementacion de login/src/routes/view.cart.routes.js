import { Router } from 'express';
import * as CartController from "../controllers/cart.controllers.js";

const router = Router();

// GET Render WEB HTML CART
router.get("/:cid", CartController.getACartByIdWebFront);

export default router;