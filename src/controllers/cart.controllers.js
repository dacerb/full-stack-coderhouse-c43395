import { ticketManager, cartManager, userManager, productManager } from "../services/factory.js";


// API BACK
export async function getACartById(req, res) {
    let { cid } = req.params;
    try {
        const response = await  cartManager.getCartById(cid);
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

export async function addProductInACart(req, res) {

    let { cid, pid } = req.params;
    const cartId = cid;
    const productId = pid;
    try {

        if (productId &&  cartId){

            const  cart_updated = await cartManager.addProductInCart(cartId, productId)
            if (cart_updated) {
                return res.status(200).send(
                    JSON.stringify({
                        message: `the product with id ${productId} was update in the cart id ${cartId}`
                    }, null, 4)
                );
            }

            return res.status(404).send(
                JSON.stringify({
                    message: "the product was not added to the cart because the cart id was not found"
                }, null, 4)
            );

        }

        res.status(400).send(
            JSON.stringify({
                "message": "the id parameter must be a positive integer."
            }, null, 4)
        );
    }catch (error) {
        if (error.name ==='productNotExit') {
            return  res.status(404).send({
                message: "the product must be exist",
                error: error.message
            });
        }


        return  res.status(500).send({
                message: "internal server error.",
                error: error
        });
    }
}

export async function createACart(req, res) {
    const response = await  cartManager.createCart();
    res.send({
        message: "success",
        resutl: response
    })
}

export async function updateProductQtyFromCartByCartIdAndProductId(req, res) {
    let { cid, pid } = req.params;
    let { qty } = req.body;

    const qty_of_products = parseInt(qty);

    try {
        if (isNaN(qty_of_products) && (qty_of_products >= 0)) {
            let error =  Error();
            error.name = "qtyError"
            error.message = "The qty must be a positive integer"
            throw error
        }
        const response = await  cartManager.updateProductQtyFromCartByCartIdAndProductId(cid, pid, qty_of_products);
        return res.send({
            message: "success",
            resutl: response
        })

    }catch (error) {
        if (error.name === 'cartNotFound') {
            const {message} = error
            return res.status(404).send({
                message: message
            })
        }
        if (error.name === 'qtyError') {
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

export async function updateAllProductsFromCartByCartId(req, res) {
    let { cid } = req.params;
    let products = req.body;
    try {
        const response = await  cartManager.updateAllProductsFromCartByCartId(cid, products);
        return res.status(200).send({
            message: "success",
            resutl: response
        })
    }catch (error) {
        if (error.name === 'cartNotFound') {
            const {message} = error
            return  res.status(404).send({
                message: message
            })
        }
        return res.status(500).send({
            message: "Internal server error",
            error: error
        })
    }
}

export async function deleteProductFromCartByPIdAndCartId(req, res) {
    let { cid, pid } = req.params;
    try {
        const response = await  cartManager.deleteProductFromCartByPIdAndCartId(cid, pid);
        res.send({
            message: "success",
            resutl: response
        })
    }catch (error) {
        if (error.name === 'cartNotFound') {
            const {message} = error
            return  res.status(404).send({
                message: message
            })
        }
        return res.status(500).send({
            message: "Internal server error",
            error: error
        })
    }
}

export async function deleteAllProductFromCartByCartId(req, res) {
    let { cid } = req.params;
    try {
        const response = await  cartManager.deleteAllProductFromCartByCartId(cid);
        res.status(200).send({
            message: "success",
            resutl: response
        });
    }catch (error) {
        if (error.name === 'cartNotFound') {
            const {message} = error
            return  res.status(404).send({
                message: message
            })
        }
        return res.status(500).send({
            message: "Internal server error",
            error: error
        })
    }
}

export async function registerPurchase(req, res) {
    let userSession = req.session;
    let { cid } = req.params;
    console.log('TAMO ACA 47')
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


