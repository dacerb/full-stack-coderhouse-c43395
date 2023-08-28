import { Router } from 'express';
import * as TestImple from "../controllers/testImplementationCartControllers.js";
import * as CartController from "../controllers/cartControllers.js";

const router = Router();

// GET HOME
router.get("/:cid", TestImple.getCart);

router.post("/", TestImple.addCart);

router.post("/:cid/product/:pid", TestImple.addProductInACart);

export default router;