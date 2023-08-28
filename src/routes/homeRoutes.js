import { Router } from 'express';
import * as HomeController from "../controllers/homeControllers.js";

const router = Router();

// GET HOME
router.get("/", HomeController.getHome)

export default router;