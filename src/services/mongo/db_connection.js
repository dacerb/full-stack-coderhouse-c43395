import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const URL_DB = process.env.MONGO_URL;
mongoose.connect(
    // URL MONGO DB
    URL_DB,
    {
        // Si hay algun error por recomendacion lo capturamos en esta seccion
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

export default mongoose;