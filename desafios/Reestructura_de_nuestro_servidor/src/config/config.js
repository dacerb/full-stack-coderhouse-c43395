import dotenv from 'dotenv';
import {Command} from 'commander';
import {compareSync} from "bcrypt";

const program = new Command(); //Crea la instancia de comandos de commander.

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del servidor', 8080)
    .option('--persist <modo>', 'Modo de persistencia', "mongodb")
    .option('--mode <mode>', 'Modo de trabajo', 'develop')
program.parse();

//console.log("Options: ", program.opts());
console.log("Mode Option: ", program.opts().mode);
console.log("Mode Persistencia: ", program.opts().persist);

const environment = program.opts().mode;
const env_selected_config = environment==="production"?"./src/config/.env.production":"./src/config/.env.development"

dotenv.config({
    path:env_selected_config
});

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    persistence: program.opts().persist,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    secret: process.env.SECRET_PHRASE
};