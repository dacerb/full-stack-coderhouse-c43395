import { cartsModel } from './models/cart.js';

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
                    return cart
                }
            )
            .catch(error => {
                console.error('Error:', error);
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
                if (cart) {
                    cart.products = []
                    return cart.save();
                }
                return cart;

            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    deleteProductFromCartByPIdAndCartId = async (cartId, productId) => {
        return cartsModel.findOne({_id: cartId})
            .then(cart => {
                if (cart) {
                    const update_cart = cart.products.filter(product => product.productId !== productId);
                    cart.products = update_cart
                    return cart.save();
                }
                return cart;

            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    updateProductQtyFromCartByCartIdAndProductId = async (cartId, productId, qty) => {

        console.log(cartId, productId, qty)

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
                return cart;
            })
            .catch(error => {
                console.error('Error:', error);
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
                return cart;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

};

export default CartManager;