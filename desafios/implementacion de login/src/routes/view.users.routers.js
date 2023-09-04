import { Router } from 'express';
import * as UsersController from "../controllers/userController.js";

const router = Router();

router.get("/register/", UsersController.register);

router.get("/login/", UsersController.login);

router.get("/", UsersController.profile);

export default router;