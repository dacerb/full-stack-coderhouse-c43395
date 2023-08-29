import productManager from "../dao/selectedProductDb.js";

/*
export async function createNewProduct(req, res) {

    if (!req.files.length > 0) {
        return res.status(400).send(JSON.stringify({ status: "error", mensaje: "you must attach image files." }, null, 4));
    }
    const filesPath = req.files.map(file =>   {
        return file.path
    })

    let new_product = await productManager.addProduct({
        thumbnail: filesPath,
        ...req.body
    });

    res.status(200).send(JSON.stringify({"message": `a new product was added with id ${new_product}` }, null, 4));
};

export async function deleteProductById(req, res) {

    let { pid } = req.params;
    const id = parseInt(pid);

    if (!isNaN(id) && id > 0) {


        let new_product = await productManager.deleteProduct(id);

        if (new_product) {
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

    res.status(400).send(
        JSON.stringify({
            "message": "the id parameter must be a positive integer."
        }, null, 4)
    );
};

export async function updateProductById(req, res) {

    let { pid } = req.params;
    const id = parseInt(pid);

    if (!isNaN(id) && id > 0) {
        const filesPath = req.files.map(file =>   {
            return file.path
        })

        let new_product = await productManager.updateProductById({
            id,
            thumbnail: filesPath,
            ...req.body
        });


        if (new_product) {
            return res.status(200).send(
                JSON.stringify({
                    "message": `the product with id ${id} was updated.`
                }, null, 4)
            );
        }

        return res.status(404).send(
            JSON.stringify({
                "message": `the product with id ${id} not found.`
            }, null, 4)
        );
    }

    res.status(400).send(
        JSON.stringify({
            "message": "the id parameter must be a positive integer."
        }, null, 4)
    );
};

export async function getProducts(req, res) {

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
};

export async function getProductById(req, res) {

    let { pid } = req.params;
    const id = parseInt(pid);

    if (!isNaN(id) && id > 0) {
        let producto_by_id = await productManager.getProductById(id);

        if (!producto_by_id.length){
            return res.status(404).send(
                JSON.stringify({
                    message: "not found products by id: "+ id,
                }, null, 4)
            );
        }

        return res.status(200).send(
            JSON.stringify({
                searchId: id,
                data: producto_by_id
            }, null, 4)
        );
    }

    return res.status(400).send(
        JSON.stringify({
            "message": "the id parameter must be a positive integer."
        }, null, 4)
    );
};

 */

export async function createNewProduct(req, res) {

    if (!req.files.length > 0) {
        return res.status(400).send(JSON.stringify({ status: "error", mensaje: "you must attach image files." }, null, 4));
    }
    const filesPath = req.files.map(file =>   {
        return file.path
    })

    let new_product = await productManager.addProduct({
        thumbnail: filesPath,
        ...req.body
    });

    res.status(200).send({
        message: "a new product was added",
        result: new_product
    });
};

export async function deleteProductById(req, res) {

    let { pid } = req.params;
    const id = pid;

    if (id) {
        let delete_product = await productManager.deleteProduct(id);

        if (delete_product) {
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

    res.status(400).send(
        JSON.stringify({
            "message": "the id parameter must be a positive integer."
        }, null, 4)
    );
};

export async function updateProductById(req, res) {

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

    res.status(400).send(
        JSON.stringify({
            "message": "the id parameter must be a positive integer."
        }, null, 4)
    );
};

export async function getProducts(req, res) {

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
};

export async function getProductsQuery(req, res) {
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
};

export async function getProductById(req, res) {

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

    return res.status(400).send(
        JSON.stringify({
            "message": "the id parameter must be a positive integer."
        }, null, 4)
    );
};