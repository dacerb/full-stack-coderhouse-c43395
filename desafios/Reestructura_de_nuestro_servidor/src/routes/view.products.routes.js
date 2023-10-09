import {Router} from 'express';
import {requiredLoginSession} from "./utils/utils.js"
import cartManager from "../services/dao/cart.dao.js";
import productManager from "../services/dao/product.dao.js";

const router = Router();

router.get("/", requiredLoginSession, async (req, res) => {
    const query = req.query;
    const user = req.session.user;

    const options = {
        page: parseInt(query.page ?? 1),
        limit: parseInt(query.limit ?? 2)
    };
    if (query.sort === "desc") options.sort = {price: -1};
    if (query.sort === "asc") options.sort = {price: 1};

    delete query.page
    delete query.limit
    delete query.sort

    try {
        let myCookieCart = req.cookies.myCookieCart;
        try {
            const foundCart = await cartManager.getCartById(myCookieCart);
        } catch (error) {
            if (error.name === 'cartNotFound') {
                const newCart = await cartManager.addCart();
                const newCartID = newCart._id.toString();
                res.cookie('myCookieCart', newCartID, {maxAge: 900000, httpOnly: true});
                myCookieCart = newCartID;
            }
        }

        const data_paginate = await productManager.getProductsByPaginateQueryOptions(query, options);
        const documents = data_paginate.docs?.map(document => document.toJSON())

        let keys = data_paginate;
        delete keys.docs

        keys.prevLink = keys.hasPrevPage ? `http://localhost:8080/products?page=${keys.prevPage}` : '';
        keys.nextLink = keys.hasNextPage ? `http://localhost:8080/products?page=${keys.nextPage}` : '';
        keys.isValid = !(options.page <= 0 || options.page > keys.totalPages)

        keys.cartId = myCookieCart
        res.render('products_paginate', {
            data: documents,
            user,
            ...keys,
            sessionActive: req.session.user ? true : false,
            style: 'home.css'
        });
    } catch (error) {
        res.render('error',
            {
                error: JSON.stringify(error)
            });
    }
});


export default router;