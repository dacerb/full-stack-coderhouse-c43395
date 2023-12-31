import { Router } from 'express';
import * as CartController from "../controllers/cart.controllers.js";
import {requiredRole} from "./utils/utils.js";
import errorHandler from "../services/errors/middlewares/error.handler.js";

const router = Router();

// GET cart by id
router.get("/:cid", CartController.getACartById);

// POST add products in a cart
router.post("/:cid/product/:pid", requiredRole(['user'], null), CartController.addProductInACart);

// POST create a cart
router.post("/", CartController.createACart);

// PUT update qty selected from pid
router.put("/:cid/products/:pid", CartController.updateProductQtyFromCartByCartIdAndProductId);

// PUT update all cart with the new array
router.put("/:cid", CartController.updateAllProductsFromCartByCartId);

// DELETE delete pid from the cart
router.delete("/:cid/products/:pid", CartController.deleteProductFromCartByPIdAndCartId);

// DELETE delete elements from the cart by cart id
router.delete("/:cid", CartController.deleteAllProductFromCartByCartId);

// POST ticket purchase
router.post("/:cid/purchase", CartController.registerPurchase);


router.use(errorHandler)

export default router;