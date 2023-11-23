import mongoose from "mongoose";
import * as ModelType from "../../../../common/utils/schemaModelsType.js"

const collectionName = 'tickets';

const ticketSchema = new mongoose.Schema({
        description: ModelType.stringTypeSchemaNonUniqueRequired,
        code: ModelType.stringTypeSchemaUniqueRequired,
        amount: ModelType.numberTypeSchemaNonUniqueRequired,
        purchaser: ModelType.stringEmailTypeSchemaRequired,
        purchase_datetime: ModelType.datetimeRequiredDefaultNow,
    },
    { timestamps: true }
);

export const ticketModel = mongoose.model(collectionName, ticketSchema);
