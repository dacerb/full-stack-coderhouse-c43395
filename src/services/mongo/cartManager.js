import { cartsModel } from './models/cart.js';
import * as tty from "tty";

class CartManager {

    addCart = async () => {
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

        return cartsModel.findOne({_id: cartId})
            .then(cart => {

                if (cart){
                    const productIndex = cart.products.findIndex(product => product.productId === productId);
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
        return cartsModel.findOneAndUpdate(
            {
                _id: cartId
            },
            {
                $set: {
                    'products': products
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

};

export default CartManager;