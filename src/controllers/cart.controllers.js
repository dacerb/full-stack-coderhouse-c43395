import { ticketManager, cartManager, userManager, productManager } from "../services/factory.js";
import { codeGenerator } from "../common/utils/utils.js";
import CustomError from "../services/errors/custom.error.js";
import {ProductsErrMessage} from "../services/errors/messages/products.error.message.js";
import EErrors from "../services/errors/errors.enum.js";


// API BACK
export async function getACartById(req, res, next) {
    const { logger } = req
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
                logger.warning(error)
                const {message} = error
                return res.status(404).send({
                    message: message
                })
            }
            logger.error(error)
            logger.fatal(error)
            return res.status(500).send({
                message: "Internal server error",
                error: error
            })
        }
}

export async function addProductInACart(req, res, next) {
    const { logger } = req
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
            logger.warning(error)

            return  res.status(404).send({
                message: "the product must be exist",
                error: error.message
            });
        }

        logger.error(error)
        logger.fatal(error)
        CustomError.create({
            name: "addProductInACart Error",
            cause: "unknow",
            message: error.message,
            code: EErrors.INTERNAL_ERROR,
        }, next)
    }
}

export async function createACart(req, res, next) {
    const response = await  cartManager.createCart();
    res.send({
        message: "success",
        resutl: response
    })
}

export async function updateProductQtyFromCartByCartIdAndProductId(req, res, next) {
    const { logger } = req
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
            logger.warning(error)

            const {message} = error
            return res.status(404).send({
                message: message
            })
        }
        if (error.name === 'qtyError') {
            logger.warning(error)

            const {message} = error
            return res.status(404).send({
                message: message
            })
        }

        logger.error(error)
        logger.fatal(error)
        CustomError.create({
            name: "updateProductQtyFromCartByCartIdAndProductId Error",
            cause: "unknow",
            message: error.message,
            code: EErrors.INTERNAL_ERROR,
        }, next)
    }
}

export async function updateAllProductsFromCartByCartId(req, res, next) {
    const { logger } = req
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
            logger.warning(error)

            const {message} = error
            return  res.status(404).send({
                message: message
            })
        }

        logger.error(error)
        logger.fatal(error)
        CustomError.create({
            name: "updateAllProductsFromCartByCartId Error",
            cause: "unknow",
            message: error.message,
            code: EErrors.INTERNAL_ERROR,
        }, next)
    }
}

export async function deleteProductFromCartByPIdAndCartId(req, res, next) {
    const { logger } = req
    let { cid, pid } = req.params;
    try {
        const response = await  cartManager.deleteProductFromCartByPIdAndCartId(cid, pid);
        res.send({
            message: "success",
            resutl: response
        })
    }catch (error) {
        if (error.name === 'cartNotFound') {
            logger.warning(error)
            const {message} = error
            return  res.status(404).send({
                message: message
            })
        }

        logger.error(error)
        logger.fatal(error)
        CustomError.create({
            name: "deleteProductFromCartByPIdAndCartId Error",
            cause: "unknow",
            message: error.message,
            code: EErrors.INTERNAL_ERROR,
        }, next)
    }
}

export async function deleteAllProductFromCartByCartId(req, res, next) {
    const { logger } = req
    let { cid } = req.params;
    try {
        const response = await  cartManager.deleteAllProductFromCartByCartId(cid);
        res.status(200).send({
            message: "success",
            resutl: response
        });
    }catch (error) {
        if (error.name === 'cartNotFound') {
            logger.warning(error)
            const {message} = error
            return  res.status(404).send({
                message: message
            })
        }

        logger.error(error)
        logger.fatal(error)
        CustomError.create({
            name: "deleteAllProductFromCartByCartId Error",
            cause: "unknow",
            message: error.message,
            code: EErrors.INTERNAL_ERROR,
        }, next)
    }
}

export async function registerPurchase(req, res, next) {
    const { logger } = req
    let response = null
    let userSession = req.session;  // Me sirve para validar el usuario que genero el Request y validar la accion como primara opcion
    let { cid } = req.params;
    try {
        const userWithCartId = await userManager.getUserByValue({ cartId: cid });
        const cart = await cartManager.getCartById(cid);

        if (!Boolean(cart.products.length)) return res.status(404).send({ message: "there are no products in the cart"});
        if (!userWithCartId) return res.status(404).send({ message: "the cartId does not have a user assigned"});

        const newTicket = {
            description: "",
            code: "",
            amount: 0,
            purchaser: userWithCartId.email,
            // purchase_datetime: "..."
        };

        const filterCartToUpdate = await Promise.all(cart.products.map(async (product) => {

            const productQty = product.qty;
            const productId = product.productId._id.toString();
            const foundProduct = await productManager.getProductById(productId);

            const currentProductStock = foundProduct.stock;

            // valida disponibilidad de stock
            if (currentProductStock >= productQty) {
                foundProduct.stock = foundProduct.stock - productQty;

                // Actualiza el stock del producto quitando los del proceso de compra
                const productUpdated = await productManager.updateProductById({
                    id: foundProduct._id,
                    ...foundProduct
                });

                // verifica que el stock se haya descontado
                if (productUpdated.stock < currentProductStock) {
                    newTicket.description += (`${product.productId.title} ($ ${product.productId.price} x ${productQty}) `);
                    newTicket.amount = newTicket.amount + (product.productId.price * productQty);
                    return null; // Retorna null para quitar el elemento de la lista porque ya se descontó
                }
            }

            return product;
        }));

        newTicket.code = codeGenerator()

        // Actualiza el carrito del usuario con los objectos filtrados
        const cartUpdated = await cartManager.updateAllProducts(cid, filterCartToUpdate.filter(Boolean));
        if (cartUpdated) {
            // Si se actualiza el carrito descontando los productos procesado del carrito del usuario generamos el ticket de compra
            response = await ticketManager.newPurchase(newTicket);
        }

        res.send({
            message: "success",
            response: response ? response : {}
        });

    } catch (error) {

        console.log(error)
        if (error.name === 'cartNotFound') {
            logger.warning(error)
            const { message } = error;
            return res.status(404).send({
                message: message
            });
        }

        logger.error(error)
        logger.fatal(error)
        CustomError.create({
            name: "registerPurchase Error",
            cause: "unknow",
            message: error.message,
            code: EErrors.INTERNAL_ERROR,
        }, next)

    }
}
