import { Router } from 'express';
import * as CartController from "../controllers/cartControllers.js";
import {deleteAllProductFromCartByCartId} from "../controllers/cartControllers.js";

const router = Router();

// GET cart by id
router.get("/:cid", CartController.getACartById);

// POST add products in a cart
router.post("/:cid/product/:pid", CartController.addProductInACart);

// POST create a cart
router.post("/", CartController.createACart);

// PUT update qty selected from pid
router.put("/:cid/products/:pid", CartController.updateCartQtyFromPid);

// PUT update all cart with the new array
router.put("/:cid", CartController.updateAllCartFromId);

// DELETE delete pid from the cart
router.delete("/:cid/products/:pid", CartController.deleteCartProductFromPid);

// DELETE delete elements from the cart by cart id
router.delete("/:cid", CartController.deleteAllProductFromCartByCartId);






export default router;