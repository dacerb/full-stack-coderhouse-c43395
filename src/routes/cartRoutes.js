import { Router } from 'express';
import * as CartController from "../controllers/cartControllers.js";

const router = Router();

// GET cart by id
router.get("/:cid", CartController.getACartById);

// POST add products in a cart
router.post("/:cid/product/:pid", CartController.addProductInACart);

// POST create a cart
router.post("/", CartController.createACart);

export default router;