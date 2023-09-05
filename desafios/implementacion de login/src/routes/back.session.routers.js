import { Router } from 'express';
import * as SessionController from "../controllers/session.controller.js";

const router = Router();

router.post("/register/", SessionController.register);

router.post("/login/", SessionController.login);

router.post("/logout/", SessionController.logout);

export default router;