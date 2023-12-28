import { Router } from 'express';
import * as UserController from "../controllers/user.controllers.js";
import {requiredRole} from "./utils/utils.js";

const router = Router();

router.delete("/",  requiredRole(['admin'], null), UserController.deleteUser);
router.get("/",  requiredRole(['admin'], null), UserController.getAllUsers);
router.put("/:uid",  requiredRole(['admin'], null), UserController.updateUserRolById);
router.delete("/:uid",  requiredRole(['admin'], null), UserController.deleteUserById);
export default router;
