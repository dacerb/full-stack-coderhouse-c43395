import { Router } from 'express';
import {requiredLoginSession} from "./utils/utils.js"
import productManager from "../dao/selectedProductDb.js";

const router = Router();

// GET HOME
router.get("/", requiredLoginSession, async(req, res) => {
    const user = req.session.user;
    const all_products = await productManager.getProducts();
    res.render('home', {
        qty: all_products.length,
        user,
        sessionActive: req.session.user,
        data: all_products,
        style: 'home.css'
    });
});

export default router;