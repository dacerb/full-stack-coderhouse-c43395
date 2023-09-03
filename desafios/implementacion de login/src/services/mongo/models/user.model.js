import mongoose from "mongoose";
import * as ModelType from "../../../common/utils/schemaModelsType.js"

const collectionName = 'users';

const userSchema = new mongoose.Schema({
        first_name: ModelType.stringTypeSchemaNonUniqueRequired,
        last_name: ModelType.stringTypeSchemaNonUniqueRequired,
        email: {
            type: ModelType.stringEmailTypeSchemaUniqueRequired,
            unique: true
        },
        age: ModelType.numberTypeSchemaNonUniqueRequired,
        password: ModelType.stringTypeSchemaUniqueRequired
    },
    { timestamps: true }
);

export const userModel = mongoose.model(collectionName, userSchema);
