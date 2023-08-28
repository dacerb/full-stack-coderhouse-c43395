import ProductManager from "../services/filesystem/productManager.js";

// INSTANCIA DE CLASE GLOBAL PRODUCTS
const productManager = new ProductManager()
export async function getHome(req, res) {
    const all_products = await productManager.getProducts();
    res.render('home', {
        qty: all_products.length,
        data: all_products,
        style: 'realTimeProducts.css'
    });
}
