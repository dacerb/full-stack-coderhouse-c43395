import ProductManager from "../services/filesystem/productManager.js";
//import ProductManager from "../services/mongo/productManager.js";

// INSTANCIA DE CLASE GLOBAL PRODUCTS
const productManager = new ProductManager();

export default  productManager;