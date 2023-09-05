import * as APIController from "../controllers/view.api.controllers.js";
import router from "./view.cart.routes.js";


// router.get("/", ProductController.getProducts); old
router.get("/",  APIController.getHome);


export default router;
