import { Router } from 'express';


const router = Router();

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
router.post("/:pid", (req, res) => {
    res.send(JSON.stringify({
        "message": "POST"
    }));
})


export default router;