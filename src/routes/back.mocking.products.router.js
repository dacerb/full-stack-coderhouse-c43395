import { Router } from 'express';
import passport from "passport";
import {MockingProducts} from "../services/mocking/mock.product.js";

const router = Router();

router.get(
    '/',
    async (req, res) => {
        const query = req.query;
        let qty = query.qty ?? 100;
        res.status(200).send(
            MockingProducts.generatorProductMockByQty(qty)
        )
    });

export default router;