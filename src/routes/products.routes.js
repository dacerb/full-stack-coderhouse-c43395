import { Router } from 'express';
import { uploader } from "../utils.js";
import ProductManager from "../helpers/ProductManager.js"


const router = Router();


// INSTANCIA DE CLASE GLOBAL PRODUCTS
const productManager = new ProductManager()


// GET
router.get("/", (req, res) => {
    res.send(JSON.stringify({
        "message": "GET"
    }));
})


// GET
router.get("/:pid", (req, res) => {
    res.send(JSON.stringify({
        "message": "GET pid"
    }));
})


// PUT
router.put("/:pid", (req, res) => {
    res.send(JSON.stringify({
        "message": "PUT"
    }));
})


// DELETE
router.delete("/:pid", (req, res) => {
    res.send(JSON.stringify({
        "message": "DELETE"
    }));
})


// POST
router.post("/", uploader.array('thumbnails'), async (req, res) => {
    

    if (!req.files) {
        return res.status(400).send({ status: "error", mensaje: "you must attach image files." });
    }
    const filesPath = req.files.map(file =>   {
        return file.path
    })

    let new_product = await productManager.addProduct({

        title: "A tu casa",
        description: "nos re vimos",
        thumbnail: ["asda"],
        price: 9128123,
        code: 'NSpqs123',
        stock: 100
    });

    res.send(JSON.stringify({
        "message": "POST"
    }));
})


export default router;