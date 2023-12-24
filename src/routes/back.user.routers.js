import { Router } from 'express';
import * as UserController from "../controllers/user.controllers.js";

const router = Router();

router.delete("/", UserController.deleteUser);
router.get("/", UserController.getAllUsers);
export default router;
