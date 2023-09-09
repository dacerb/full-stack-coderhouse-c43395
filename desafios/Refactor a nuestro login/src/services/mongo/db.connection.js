import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(
    // URL MONGO DB
    MONGO_URL,
    {
        // Si hay algun error por recomendacion lo capturamos en esta seccion
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

export default mongoose;
