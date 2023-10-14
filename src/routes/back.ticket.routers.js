import { Router } from 'express';
import * as TicketController from "../controllers/ticket.controllers.js";

const router = Router();

// POST ticket purchase
router.post("/:cid", TicketController.registerPurchase);


export default router;
