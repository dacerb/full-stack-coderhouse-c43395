import config from "../config/config.js";
import MongoSingleton from '../config/services/mongodb-singleton.js'
import ManagerTicket from "./dao/mongo/managers/manager.ticket.js";

let cartManager
let productManager
let userManager
let ticketManager

async function initializeMongoService() {
    console.log("Iniciando servicio para MongoDB");
    try {
        // conectamos Mongo
        await MongoSingleton.getIntance

        // Creamos las instancias de las Clases de DAO de Mongo
        const { default: ManagerCart } = await import('./dao/mongo/managers/manager.cart.js');
        cartManager = new ManagerCart();
        console.log("Servicio de ManagerCart cargado:");
        console.log(cartManager);

        const { default: ManagerProduct } = await import('./dao/mongo/managers/manager.product.js');
        productManager = new ManagerProduct();
        console.log("Servicio de ManagerProduct cargado:");
        console.log(productManager);

        const { default: ManagerUser } = await import('./dao/mongo/managers/manager.user.js');
        userManager = new ManagerUser();
        console.log("Servicio de ManagerSession cargado:");
        console.log(userManager);

        const { default: ManagerTicket } = await import('./dao/mongo/managers/manager.ticket.js');
        ticketManager = new ManagerTicket();
        console.log("Servicio de ManagerSession cargado:");
        console.log(ticketManager);


    } catch (error) {
        console.error("Error al iniciar MongoDB:", error);
        process.exit(1); // Salir con código de error
    }
}

async function initializeFileSystemService() {
    console.log("Iniciando servicio para FileSystem");
    try {
        throw new Error("The service is not supported.");

    } catch (error) {
        console.error("Error al iniciar FileSystem:", error);
        process.exit(1); // Salir con código de error
    }
}


switch (config.persistence) {
    case 'mongodb':
        initializeMongoService();
        break;

    case 'files':
        //
        initializeFileSystemService();
        break;

    default:
        console.error("Persistencia no válida en la configuración:", config.persistence);
        process.exit(1); // Salir con código de error
}

export {
    cartManager,
    productManager,
    userManager,
    ticketManager
}
