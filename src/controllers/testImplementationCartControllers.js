import ProductManager from "../services/mongo/productManager.js";
import CartManager from "../services/mongo/cartManager.js";


const cartManager = new CartManager();
const productManager = new ProductManager();

/*
Realizar todos los test previos a la implementacion de la solucion del carrito y producto

*/
export async function getData(req, res) {
    const response = await  cartManager.getCartById(1);
    res.send({message: "Test imple"})
};
