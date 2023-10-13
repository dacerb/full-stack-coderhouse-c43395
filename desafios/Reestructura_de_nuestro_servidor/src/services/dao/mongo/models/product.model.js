import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import * as ModelType from "../../../../common/utils/schemaModelsType.js"

const collectionName = 'products';

const productSchema = new mongoose.Schema({
        title: ModelType.stringTypeSchemaNonUniqueRequired,
        description: ModelType.stringTypeSchemaNonUniqueRequired,
        code: ModelType.stringTypeSchemaUniqueRequired,
        price: ModelType.numberTypeSchemaNonUniqueRequired,
        status: ModelType.booleanTypeSchemaNonUniqueRequired,
        stock: ModelType.numberTypeSchemaNonUniqueRequired,
        category: ModelType.stringTypeSchemaNonUniqueRequired,
        thumbnail: ModelType.arrayTypeSchemaNonUniqueRequired
    },
    { timestamps: true }
);

productSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model(collectionName, productSchema);
