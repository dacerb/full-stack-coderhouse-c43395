import mongoose from "mongoose";
import * as ModelType from "../../../common/utils/schemaModelsType.js"

const collectionName = 'carts';

const cartProductSchema = new mongoose.Schema({
    productId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    },
    qty: ModelType.numberTypeSchemaNonUniqueRequired,

});


const cartSchema = new mongoose.Schema({
    products: [{
                type: cartProductSchema,
            }]
        },
        { timestamps: true }
    );

cartSchema.pre('findOne', function () {
    this.populate("products.productId");
});
// exportar
export const cartsModel = mongoose.model(collectionName, cartSchema);
