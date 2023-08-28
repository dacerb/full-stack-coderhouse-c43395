import { Router } from 'express';
import * as TestImple from "../controllers/testImplementationCartControllers.js";

const router = Router();

// GET HOME
router.get("/", TestImple.getData);

export default router;