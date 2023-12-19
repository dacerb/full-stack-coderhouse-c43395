import { Router } from 'express';
import * as UserController from "../controllers/user.controllers.js";

const router = Router();


//router.delete("/user/:uid", requiredRole(['admin'], null), UserController.deleteUser);
//router.get("/users", requiredRole(['admin'], null), UserController.getAllUsers());
//router.get("/user/:uid", requiredRole(['admin'], null), UserController.getUserById());


router.delete("/user/:uid", UserController.deleteUser);
router.get("/users", UserController.getAllUsers);
router.get("/user/:uid", UserController.getUserById);

export default router;