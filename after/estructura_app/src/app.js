import express from "express";
import morgan from "morgan";
import "./db.js"

import UsersRoutes from "./routers/UsersRouters.js"

// variables de entorno
import dotenv from "dotenv";
dotenv.config();
