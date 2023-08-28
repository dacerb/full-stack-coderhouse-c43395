import { cartsModel } from './models/cart.js';

class CartManager {

    constructor() {
        console.log("hola")
    }


    addCart = async () => {
        try {
            console.log("creo un carrito")
        } catch (error) {
            console.error(error)
            return null
        }
    }

    getCartById = async (id) => {
        console.log("busco x el id")
        console.log(cartsModel.find({}))
    }

    addProductInCart = async (cartId, productId) => {
        console.log("agrego en el carrito")

    }

};

export default CartManager;