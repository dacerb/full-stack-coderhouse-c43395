import * as APIController from "../controllers/apiControllers.js";
import router from "./front.cartRoutes.js";


// router.get("/", ProductController.getProducts); old
router.get("/", APIController.getHome);


export default router;
