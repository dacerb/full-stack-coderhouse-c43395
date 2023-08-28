import mongoose from "mongoose";
import * as ModelType from "../../../common/utils/schemaModelsType.js"

const collectionName = 'products';

const productSchema = new mongoose.Schema({
    title: ModelType.stringTypeSchemaNonUniqueRequired,
    description: ModelType.stringTypeSchemaNonUniqueRequired,
    teacherId: ModelType.numberTypeSchemaNonUniqueRequired,
    students: ModelType.arrayTypeSchemaNonUniqueRequired
});


export const productsModel = mongoose.model(collectionName, productSchema);
