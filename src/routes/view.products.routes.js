import {Router} from 'express';
import {requiredLoginSession} from "./utils/utils.js"
import { productManager, cartManager } from "../services/factory.js";
import config from "../config/config.js";

const DOMAIN_URL = config.domain_url;
const router = Router();

router.get("/", requiredLoginSession, async (req, res) => {
    const { logger } = req
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

        const data_paginate = await productManager.getProductsByPaginateQueryOptions(query, options);
        const documents = data_paginate.docs?.map(document => document.toJSON())

        let keys = data_paginate;
        delete keys.docs

        keys.prevLink = keys.hasPrevPage ? `${DOMAIN_URL}/products?page=${keys.prevPage}` : '';
        keys.nextLink = keys.hasNextPage ? `${DOMAIN_URL}/products?page=${keys.nextPage}` : '';
        keys.isValid = !(options.page <= 0 || options.page > keys.totalPages)

        keys.cartId = user.cartId
        res.render('products_paginate', {
            data: documents,
            user,
            ...keys,
            sessionActive: req.session.user ? true : false,
            style: 'home.css'
        });
    } catch (error) {
        logger.error(error)
        res.render('error',
            {
                error: JSON.stringify(error)
            });
    }
});


export default router;
