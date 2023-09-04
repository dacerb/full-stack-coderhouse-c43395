import { Router } from 'express';
import * as SessionController from "../controllers/sessionController.js";

const router = Router();

router.get("/register/", SessionController.register);

router.get("/login/", SessionController.login);

router.get("/logout/", SessionController.logout);

router.get("/", SessionController.profile);

export default router;