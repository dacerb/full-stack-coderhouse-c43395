//import ManagerProduct from "../services/filesystem/manager.product.js";
import ManagerProduct from "../services/mongo/managers/manager.product.js";

// INSTANCIA DE CLASE GLOBAL PRODUCTS
const productManager = new ManagerProduct();

export default  productManager;