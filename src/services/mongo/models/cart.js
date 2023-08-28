import mongoose from "mongoose";
import * as ModelType from "../../../common/utils/schemaModelsType.js"
import {arrayTypeSchemaNonUniqueRequired} from "../../../common/utils/schemaModelsType.js";

const collectionName = 'carts';

const cartProductSchema = new mongoose.Schema({
    productId: ModelType.stringTypeSchemaNonUniqueRequired,
    qty: ModelType.numberTypeSchemaNonUniqueRequired
});


const cartSchema = new mongoose.Schema({
    products: [{
        type: cartProductSchema,
    }]
});

// exportar
export const cartsModel = mongoose.model(collectionName, cartSchema);
