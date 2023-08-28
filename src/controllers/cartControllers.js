import CartManager from "../services/filesystem/cartManager.js";
// INSTANCIA DE CLASE GLOBAL CARTS
const cartManager = new CartManager()


export async function getACartById(req, res) {

    let { cid } = req.params;
    const id = parseInt(cid);

    if (!isNaN(id) && id > 0) {

        const cart = await cartManager.getCartById(id)
        if (cart) {
            return res.status(200).send(
                JSON.stringify({
                    cart
                }, null, 4)
            );
        }

        return res.status(404).send(
            JSON.stringify({
                "message": `the cart with id ${id} not found.`
            }, null, 4)
        );
    }

    res.status(400).send(
        JSON.stringify({
            "message": "the id parameter must be a positive integer."
        }, null, 4)
    );
}

export async function addProductInACart(req, res) {

    let { cid, pid } = req.params;
    const cartId = parseInt(cid);
    const productId = parseInt(pid);

    if ((!isNaN(productId) && productId > 0) &&  (!isNaN(cartId) && cartId > 0)){

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
}

export async function createACart(req, res) {
    const id = await cartManager.addCart()

    if (id && !isNaN(id)) {
        return res.status(200).send(JSON.stringify({
            "message": "a new cart was created",
            "cart_id": id
        },null, 4));
    }
    res.status(500).send(JSON.stringify({
        "message": "it was not possible to create a new cart"
    }));
}