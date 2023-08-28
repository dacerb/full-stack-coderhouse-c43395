import CartManager from "../services/mongo/cartManager.js";
const cartManager = new CartManager();

/*
Realizar todos los test previos a la implementacion de la solucion del carrito y producto

*/
export async function getCart(req, res) {
    let { cid } = req.params;
    const response = await  cartManager.getCartById(cid);
    res.send({
        message: response ? "success" : "It is not possible to retrieve the cart by id." ,
        response: response ? response : {}
    })
};

export async function addCart(req, res) {
    const response = await  cartManager.addCart();
    res.send({
        message: "success",
        resutl: response
    })
};

export async function addProductInACart(req, res) {

    let { cid, pid } = req.params;
    const cartId = cid;
    const productId = pid;

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
};