import { Router } from 'express';
import * as SessionController from "../controllers/sessionController.js";

const router = Router();

router.post("/register/", SessionController.register);

router.post("/login/", SessionController.login);

router.post("/logout/", SessionController.logout);

router.get("/", SessionController.profile);

export default router;