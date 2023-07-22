import { Router } from 'express';
import { uploaderThumbnails } from "../helpers/utils.js";
import ProductManager from "../helpers/ProductManager.js"


const router = Router();


// INSTANCIA DE CLASE GLOBAL PRODUCTS
const productManager = new ProductManager()


// GET
router.get("/", async (req, res) => {

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
})


// GET
router.get("/:pid", async (req, res) => {

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
})


// PUT
router.put("/:pid", uploaderThumbnails.array('thumbnails'), async (req, res) => {

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

        return res.status(200).send(
            JSON.stringify({
                "message": "PUT."
            }, null, 4)
        );

    }

    res.status(400).send(
        JSON.stringify({
            "message": "the id parameter must be a positive integer."
        }, null, 4)
    );
})


// DELETE
router.delete("/:pid", (req, res) => {
    res.send(JSON.stringify({
        "message": "DELETE"
    }));
})


// POST Sube nuevos productos les genera el id 
router.post("/", uploaderThumbnails.array('thumbnails'), async (req, res) => {

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

    res.send(JSON.stringify({"message": `a new product was added with id ${new_product}` }, null, 4));
})


export default router;