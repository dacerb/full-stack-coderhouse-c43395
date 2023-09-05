import productManager from "../dao/selectedProductDb.js";


// RENDER VIEW FRONT
export async function getHome(req, res) {
    const user = req.session.user;
    const all_products = await productManager.getProducts();
    res.render('home', {
        qty: all_products.length,
        user,
        sessionActive: req.session.user,
        data: all_products,
        style: 'home.css'
    });
};
