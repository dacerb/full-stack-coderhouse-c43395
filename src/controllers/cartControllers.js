import cartManager from "../dao/selectedCartDb.js";


// API BACK
export async function getACartById(req, res) {
    let { cid } = req.params;
    const response = await  cartManager.getCartById(cid);
    res.send({
        message: response ? "success" : "It is not possible to retrieve the cart by id." ,
        response: response ? response : {}
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

export async function createACart(req, res) {
    const response = await  cartManager.addCart();
    res.send({
        message: "success",
        resutl: response
    })
};

export async function updateProductQtyFromCartByCartIdAndProductId(req, res) {
    let { cid, pid } = req.params;
    let { qty } = req.body;
    const response = await  cartManager.updateProductQtyFromCartByCartIdAndProductId(cid, pid, qty);
    res.send({
        message: "success",
        resutl: response
    })
};

export async function updateAllProductsFromCartByCartId(req, res) {
    let { cid } = req.params;
    let products = req.body;
    const response = await  cartManager.updateAllProductsFromCartByCartId(cid, products);
    res.send({
        message: "success",
        resutl: response
    })
};

export async function deleteProductFromCartByPIdAndCartId(req, res) {
    let { cid, pid } = req.params;
    const response = await  cartManager.deleteProductFromCartByPIdAndCartId(cid, pid);
    res.send({
        message: "success",
        resutl: response
    })
};

export async function deleteAllProductFromCartByCartId(req, res) {
    let { cid } = req.params;
    const response = await  cartManager.deleteAllProductFromCartByCartId(cid);

    if (!response) {
        return res.status(404).send({
            message: "the cart does not exist.",
            resutl: {}
        });
    }

    res.status(200).send({
        message: "success",
        resutl: response
    });
};



// RENDER VIEW FRONT
export async function getACartByIdWebFront(req, res) {
    let { cid } = req.params;
    const response = await  cartManager.getCartById(cid);

    const products = response.products.map( product => product['productId'].toJSON());

    res.render('cart_products', {
        data: products,
        cart_id: cid,
       style: 'home.css'
    });
};
