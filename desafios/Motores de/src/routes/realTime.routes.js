import { Router } from 'express';
import ProductManager from "../helpers/ProductManager.js"


const router = Router();


// INSTANCIA DE CLASE GLOBAL PRODUCTS
const productManager = new ProductManager()


// GET
router.get("/", async (req, res) => {

    const all_products = await productManager.getProducts();


    res.render('realTimeProducts', {
        qty: all_products.length,
        data: all_products
    });
})



export default router;