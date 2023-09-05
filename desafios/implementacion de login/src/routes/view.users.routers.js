import { Router } from 'express';
import * as UsersController from "../controllers/view.user.controller.js";
import {requiredLoginSession} from "./utils/utils.js"

const router = Router();

router.get("/register/", UsersController.register);

router.get("/login/",  UsersController.login);

router.get("/", requiredLoginSession, UsersController.profile);

export default router;