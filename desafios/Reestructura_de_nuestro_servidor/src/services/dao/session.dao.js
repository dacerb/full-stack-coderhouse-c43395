//import ManagerSession from "../services/filesystem/manager.session.js";
import ManagerSession from "../mongo/managers/manager.session.js";

// INSTANCIA DE CLASE GLOBAL SESSION
const sessionManager = new ManagerSession();

export default sessionManager;