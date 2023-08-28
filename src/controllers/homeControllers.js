import productManager from "../dao/selectedProductDb.js";

export async function getHome(req, res) {
    const all_products = await productManager.getProducts();
    res.render('home', {
        qty: all_products.length,
        data: all_products,
        style: 'home.css'
    });
};