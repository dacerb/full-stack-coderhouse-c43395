import mongoose from "mongoose";
import * as ModelType from "../../../common/utils/schemaModelsType.js"
import {
        stringEmailTypeSchemaUniqueRequired,
        stringTypeSchemaNonUniqueRequired
} from "../../../common/utils/schemaModelsType.js";

const collectionName = 'users';

const userSchema = new mongoose.Schema({
        first_name: ModelType.stringTypeSchemaNonUniqueRequired,
        last_name: ModelType.stringTypeSchemaNonUniqueRequired,
        email: ModelType.stringEmailTypeSchemaUniqueRequired,
        age: ModelType.numberTypeSchemaNonUniqueRequired,
        password: ModelType.stringTypeSchemaNonUniqueRequired,
        rol: ModelType.stringTypeSchemaNonUniqueRequiredRoleDefaultUser
    },
    { timestamps: true }
);

export const userModel = mongoose.model(collectionName, userSchema);
