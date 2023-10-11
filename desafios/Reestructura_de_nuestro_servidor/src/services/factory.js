import config from "../config/config.js"

let cartManager
let productManager
let sessionManager

switch (config.persistence) {
    case 'mongodb':
        break

    case 'filesystem':
        break

    default:
        // Si no se carga correctamente la persistencia se loguea y se termina el programa.
        console.error("Persistencia no válida en la configuración:", config.persistence);
        process.exit(1);
}

export {
    cartManager,
    productManager,
    sessionManager
};