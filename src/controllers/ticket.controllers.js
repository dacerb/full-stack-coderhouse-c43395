import { ticketManager, cartManager, userManager, productManager} from "../services/factory.js";


// API BACK
export async function registerPurchase(req, res) {
    let userSession = req.session;
    let { cid } = req.params;
    try {

        const userWithCartId = await  userManager.getUserByValue({cartId:cid})
        const cart = await  cartManager.getCartById(cid)

        cart.products.map(async (product)=> {

            const productQty = product.qty;
            const productId = product.productId._id.toString()
            const foundProduct = await productManager.getProductById(productId);

            // valido disponibilidad
            const currentProductStock = foundProduct.stock;
            if (currentProductStock >= productQty) {

                foundProduct.stock = foundProduct.stock - productQty
                const productUpdated = await productManager.updateProductById({
                    id:foundProduct._id,
                    ...foundProduct
                })

                if (productUpdated.stock < currentProductStock){
                    product['purchase_processed'] = true
                }
            }
        })
        console.log('cart: ', cart)


        const response = await  ticketManager.newPurchase(cid);
        res.send({
            message: response ? "success" : "It is not possible to retrieve the cart by id." ,
            response: response ? response : {}
        })
    }
    catch (error) {
        if (error.name === 'cartNotFound') {
            const {message} = error
            return res.status(404).send({
                message: message
            })
        }
        return res.status(500).send({
            message: "Internal server error",
            error: error
        })
    }
}


