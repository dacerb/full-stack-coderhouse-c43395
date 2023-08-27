import express from "express";
import morgan from "morgan";
import "./db.js"

import UsersRoutes from "./routers/UsersRouters.js"

// variables de entorno
import dotenv from "dotenv";
dotenv.config();

const app = express();

// para recibir data desde postman o payloads por bodu
// Middlewares a nivel de app
app.use(express.json());

// Router
app.use("/users", UsersRoutes)

const PORT = process.env.PORT

// Listener
app.listen(PORT)
console.log(`Start express server in the port: ${PORT}`)