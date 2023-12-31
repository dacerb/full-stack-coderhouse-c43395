import { cartsModel } from '../models/cart.model.js';
import * as tty from "tty";
import {productModel} from "../models/product.model.js";

class ManagerCart {

    createCart = async () => {
        return cartsModel.create({products:[]})
            .then( newCart => {
                    return newCart.toJSON();
            })
            .catch(error => {
            console.error('Error:', error);
        });
    };

    getCartById = async (id) => {
        return cartsModel.findOne({_id: id})
            .then(cart => {
                    if (!cart) {
                    let error=  Error();
                    error.name = "cartNotFound"
                    error.message = "it was not possible to recover the cart"
                    throw error;
                }
                    return cart
                }
            )
            .catch(error => {
                throw error
            });
    };

    addProductInCart = async (cartId, productId) => {
        // ME FALTA VALIDAR QUE EL PRODUCTO ID EXISTE ANTES DE AGREGAR AL CARRITO
        const existProduct = await  productModel.findOne({_id: productId});
        if (!existProduct) {
            let error = new Error()
            error.name = 'productNotExit'
            error.message = 'cannot find the product in the database'
            throw error;
        }

        return cartsModel.findOne({_id: cartId})
            .then(cart => {

                if (cart){
                    const productIndex = cart.products.findIndex(product => product.productId._id.toString() === productId);


                    if (productIndex >= 0){
                        cart.products[productIndex].qty ++
                    } else {
                        cart.products.push({
                            productId,
                            qty: 1
                        });
                    }
                    return cart.save();
                }
                return cart;

            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    deleteAllProductFromCartByCartId = async (cartId) => {
        return cartsModel.findOne({_id: cartId})
            .then(cart => {
                if (!cart) {
                    let error = new Error();
                    error.name = "cartNotFound"
                    error.message = "it was not possible to delete all products in the cart"
                    throw error;
                }
                cart.products = []
                return cart.save();

            })
            .catch(error => {
                throw error
            });
    };

    deleteProductFromCartByPIdAndCartId = async (cartId, productId) => {
        return cartsModel.findOne({_id: cartId})
            .then(cart => {
                if (!cart) {
                    let error = new Error();
                    error.name = "cartNotFound"
                    error.message = "it was not possible delete products id in the cart"
                    throw error;
                }
                const update_cart = cart.products.filter(product => product.productId !== productId);
                cart.products = update_cart
                return cart.save();

            })
            .catch(error => {
                throw error
            });
    };

    updateProductQtyFromCartByCartIdAndProductId = async (cartId, productId, qty) => {
        return cartsModel.findOneAndUpdate(
            {
                _id: cartId,
                'products.productId': productId
            },
            {
                $set: {
                    'products.$.qty': qty
                }
            },
            { new: true })
            .then(cart => {
                if (!cart) {
                    let error = new Error();
                    error.name = "cartNotFound"
                    error.message = "it was not possible to update the cart"
                    throw error;
                }
                return cart;
            })
            .catch(error => {
                throw error
            });
    };

    updateAllProductsFromCartByCartId = async (cartId, products) => {

        const availableProducts = await Promise.all(products.map(async product => {
            const existProduct = await productModel.findOne({ _id: product.productId });
            if (existProduct) {
                return product;
            }
            return null; // Si el producto no existe, retornamos null
        }));
        const filteredProducts = availableProducts.filter(product => product !== null);

        return cartsModel.findOneAndUpdate(
            {
                _id: cartId
            },
            {
                $set: {
                    'products': filteredProducts
                }
            },
            { new: true })
            .then(cart => {
                if (!cart) {
                    let error = new Error();
                    error.name = "cartNotFound"
                    error.message = "it was not possible to update the cart"
                    throw error;
                }
                return cart;
            })
            .catch(error => {
                throw error
            });
    };

    updateAllProducts = async (cartId, productList) => {
        return cartsModel.findOneAndUpdate(
            { _id: cartId},
            { products: productList},
            { new: true }, // Para obtener el documento actualizado
        )
        .then(cart => {
            if (!cart) {
                let error = new Error();
                error.name = "cartNotFound"
                error.message = "it was not possible to update the cart"
                throw error;
            }
            return cart;
        })
        .catch(error => {
            throw error
        });
    }

    deleteProductByIDFromAnyCartsAndReturnCarts = async (productId) => {

        // defino el filtro
        const FILTER_CART = {
            'products': {
                $elemMatch: {
                    'productId': productId
                }
            }
        }

        // Ubico los carritos que tiene el producto a eliminar
        const affectedCarts = await cartsModel.find(FILTER_CART)

        // genero una lista de carritos para luego notificar que se removio el producto
        const affectedCartList = affectedCarts.map(cart => {
            return cart._id.toString()
        })

        // elimino los productos
        const cartManyUpdatePullResult =  await cartsModel.updateMany({
                'products': {
                    $elemMatch: {
                        'productId': productId
                    }
                }
            }, {
                $pull: { 'products': { 'productId': productId } }
            }
        );

        return {affectedCartList, cartManyUpdatePullResult}
    }

}

export default ManagerCart;