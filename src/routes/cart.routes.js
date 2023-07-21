import { Router } from 'express';


const router = Router();

// GET
router.get("/:cid", (req, res) => {
    res.send(JSON.stringify({
        "message": "GET cid"
    }));
})


// POST
router.post("/:cid/product/:pid", (req, res) => {
    res.send(JSON.stringify({
        "message": "POST cid"
    }));
})


// POST
router.post("/", (req, res) => {
    res.send(JSON.stringify({
        "message": "POST"
    }));
})

export default router;