import ProductManager from "../services/mongo/productManager.js";


const productManager = new ProductManager();

/*
Realizar todos los test previos a la implementacion de la solucion del carrito y producto

*/
export async function getData(req, res) {
    const response = await  productManager.getProducts();
    res.send({message: "Test imple"})
};
