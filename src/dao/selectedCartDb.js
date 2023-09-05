//import ManagerCart from "../services/filesystem/manager.cart.js";
import CartManager from "../services/mongo/cartManager.js";

// INSTANCIA DE CLASE GLOBAL CARTS
const cartManager = new CartManager();

export default cartManager;