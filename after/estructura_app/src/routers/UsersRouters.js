import express from "express";
import * as UserController from "../controllers/usersControllers.js"
import {getAllUsers} from "../controllers/usersControllers.js";

const router = express.Router();

router.post("/", UserController.createUser);
router.get("/", UserController.getAllUsers);


export default router;