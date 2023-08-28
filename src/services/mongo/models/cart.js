import mongoose from "mongoose";
import * as ModelType from "../../../common/utils/schemaModelsType.js"

const collectionName = 'carts';

const cartSchema = new mongoose.Schema({
    title: ModelType.stringTypeSchemaNonUniqueRequired
});

// exportar
export const cartsModel = mongoose.model(collectionName, cartSchema);
