// RENDER VIEW FRONT
import cartManager from "../dao/selectedCartDb.js";

export async function getACartByIdWebFront(req, res) {
    let {cid} = req.params;
    const user = req.session.user;
    try {
        const response = await cartManager.getCartById(cid);
        const products = response?.products.map(product => {
                return {
                    ...product['productId'].toJSON(),
                    qty: product['qty']
                }
            }
        );

        res.render('cart_products', {
            data: products,
            cart_id: cid,
            user,
            sessionActive: req.session.user ? true : false,
            style: 'home.css'
        });
    } catch (error) {
        res.render('error',
            {
                error: JSON.stringify(error)
            });
    }
}