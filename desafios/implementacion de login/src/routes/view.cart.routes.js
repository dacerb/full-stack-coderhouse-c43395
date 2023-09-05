import {Router} from 'express';
import {getACartByIdWebFront} from "../controllers/view.cart.controller.js";
import {requiredLoginSession} from "./utils/utils.js"

const router = Router();

// GET Render WEB HTML CART
router.get("/:cid", requiredLoginSession, getACartByIdWebFront);

export default router;