import mongoose from "mongoose";
import * as ModelType from "../../../common/utils/schemaModelsType.js"

const collectionName = 'products';

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: String,
    price: Number,
    status:Boolean,
    stock: Number,
    category: String,
    thumbnail: String
});


export const productsModel = mongoose.model(collectionName, productSchema);
