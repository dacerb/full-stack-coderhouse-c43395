import express from 'express'
import mongoose from 'mongoose'

import usersRouter from './routers/user.router.js'


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

const SERVER_PORT = 9090


app.use("/api/users", usersRouter);
app.listen(SERVER_PORT, () => {

    console.log('El servicio inicion en el puerto: ' + SERVER_PORT)
})

const USER = 'xx'
const PASS = "xxx"

const DB = `mongodb+srv://${USER}:${PASS}@cluster0.koltvse.mongodb.net/pruebas?retryWrites=true&w=majority`
const connectMongoDB = async () =>  {
    try {
        const mongoose_run = await mongoose.connect(DB);
        // console.log(mongoose_run)
        console.log('Conectado con exito a MongoDB')
    }
    catch (error) {
        console.error("No se puede conectar con la DB: "+ error)
        process.exit()
    }
}

connectMongoDB();