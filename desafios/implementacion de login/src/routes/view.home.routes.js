import { Router } from 'express';
import * as HomeController from "../controllers/view.home.controllers.js";
import {requiredLoginSession} from "./utils/utils.js"

const router = Router();

// GET HOME
router.get("/", requiredLoginSession, HomeController.getHome);

export default router;