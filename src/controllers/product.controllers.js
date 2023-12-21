import { productManager, cartManager, userManager } from "../services/factory.js";
import CustomError from "../services/errors/custom.error.js";
import EErrors from "../services/errors/errors.enum.js";
import {ProductsErrMessage} from "../services/errors/messages/products.error.message.js";
import MailingService from "../services/email/mailing.js";
import config from "../config/config.js";



// API BACK
export async function addNewProduct(req, res, next) {
    const { logger } = req
    if (!req.files.length > 0) {
        return res.status(400).send(JSON.stringify({ status: "error", mensaje: "you must attach image files." }, null, 4));
    }
    const filesPath = req.files.map(file =>   {
        return file.path
    })

    try {

        let new_product = await productManager.addProduct({
            thumbnail: filesPath,
            ...req.body
        });

        res.status(200).send({
            message: "a new product was added",
            result: new_product
        });


    } catch (error) {
        if (error.name === "MongoServerError") {
            logger.warning(error)
            CustomError.create({
                name: "MongoServerError",
                cause: ProductsErrMessage.schemmaError({thumbnail: filesPath, ...req.body}),
                message: error.message,
                code: EErrors.INVALID_TYPES_ERROR,
            }, next)

        } else {
            logger.error(error)
            next(error)
        }

    }
}

export async function deleteProductById(req, res, next) {
    let { pid } = req.params;
    const id = pid;

    if (id) {

        // recupero el producto para notificar cuando se elimina de algun carrito premium
        const product = await productManager.getProductById(id)
        const delete_product = await productManager.deleteProduct(id);

        if (delete_product) {
            const dispacher = new MailingService()

            const cartsThatHadTheProduct = await cartManager.deleteProductByIDFromAnyCartsAndReturnCarts(id)
            cartsThatHadTheProduct.affectedCartList.forEach(cartId => {
                userManager.getUserByValue({cartId: cartId})
                    .then(user => {

                        if (user.rol === 'premium') {
                            dispacher.sendSimpleMail({
                                from: config.mailing.USER,
                                to: user.email,
                                subject: "¡Aviso sobre modificaciones en tu carrito!",
                                html: `<div><h3> Sabemos que eres parte de nuestros clientes <strong>${user.rol}</strong> y queremos mantenerte informado.  </h3><p>Por esta razón queremos contarte que el producto <strong>${product.title}</strong> no se encuentra más disponible y lo hemos retirado de tu carrito,  <br>te pedimos disculpas por las molestias ocasionadas. <br>¡Gracias por seguir confiando en nosotros!..</p></div>`
                            })
                        }

                    })
                    .catch(error => {
                        // poner el logger....
                        console.error('Error:', error);
                    });
            })

            return res.status(200).send(
                JSON.stringify({
                    "message": `the product with id ${id} was deleted.`
                }, null, 4)
            );
        }

        return res.status(404).send(
            JSON.stringify({
                "message": `the product with id ${id} not found.`
            }, null, 4)
        );


    }

    CustomError.create({
        name: "deleteProductById Error",
        cause: "the id parameter must be a positive integer.",
        message: "Problems with the products ID <pid>",
        code: EErrors.INVALID_TYPES_ERROR,
    }, next)
}

export async function updateProductById(req, res, next) {

    let { pid } = req.params;
    const id = pid;

    if (id) {
        const filesPath = req.files.map(file =>   {
            return file.path
        })

        let update_product = await productManager.updateProductById({
            id,
            thumbnail: filesPath,
            ...req.body
        });

        if (update_product) {
            return res.status(200).send({
                message: `the product with id ${id} was updated.`,
                result: update_product
            });
        }

        return res.status(404).send(
            JSON.stringify({
                "message": `the product with id ${id} not found.`
            }, null, 4)
        );
    }

    CustomError.create({
        name: "updateProductById",
        cause: "the id parameter must be a positive integer.",
        message: "the id parameter must be a positive integer.",
        code: EErrors.INVALID_TYPES_ERROR,
    }, next)

}

export async function getProducts(req, res, next) {

    const { limit } = req.query;
    const all_products = await productManager.getProducts();
    const limit_element = parseInt(limit);

    if (!isNaN(limit_element) && limit_element > -1) {
        const limit_products = all_products.slice(0, limit_element);
        return res.send(
            JSON.stringify({
                qty: limit_products.length,
                data: limit_products
            }, null, 4)
        );
    }

    return res.send(
        JSON.stringify({
            qty: all_products.length,
            data: all_products
        }, null, 4)
    );
}

export async function getProductsQuery(req, res, next) {
    const query = req.query;

    const options = {
        page: parseInt(query.page ?? 1),
        limit: parseInt(query.limit ?? 10),
    };
    if (query.sort === "desc") options.sort = { price: -1 };
    if (query.sort === "asc") options.sort = { price: 1 };

    delete query.page
    delete query.limit
    delete query.sort

    const data_paginate = await productManager.getProductsByPaginateQueryOptions(query, options);
    const documents = data_paginate.docs?.map(document => document.toJSON())

    let  keys = data_paginate;
    delete keys.docs

    res.status(200).send({
        status: data_paginate ? 'success': 'error',
        payload: documents,
        ...keys
    })
}

export async function getProductById(req, res, next) {

    let { pid } = req.params;
    const id = pid;

    if (id) {
        const producto_by_id = await productManager.getProductById(id);
        if (!producto_by_id){
            return res.status(404).send(
                JSON.stringify({
                    message: "not found products by id: "+ id,
                }, null, 4)
            );
        }

        return res.status(200).send({
            searchId: id,
            data: producto_by_id
        });
    }

    CustomError.create({
        name: "updateProductById",
        cause: "the id parameter must be a positive integer.",
        message: "the id parameter must be a positive integer.",
        code: EErrors.INVALID_TYPES_ERROR,
    }, next)

}
