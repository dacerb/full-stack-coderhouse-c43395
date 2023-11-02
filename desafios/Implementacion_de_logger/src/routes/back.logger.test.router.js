import { Router } from 'express';

const router = Router();

router.get(
    '/',
    async (req, res) => {

        // LO LOGGERS
        res.status(200).send(
            {
                message: "run all logger options"
            }
        )
    });

export default router;
