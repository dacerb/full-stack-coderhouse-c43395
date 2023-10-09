//import ManagerCart from "../services/filesystem/manager.cart.js";
import ManagerCart from "../mongo/managers/manager.cart.js";

// INSTANCIA DE CLASE GLOBAL CARTS
const cartManager = new ManagerCart();

export default cartManager;