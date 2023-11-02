import { Router } from 'express';

const router = Router();

router.get(
    '/',
    async (req, res) => {

        const { logger } = req

        logger.debug('Logger debug request: /loggertest')
        logger.http('Logger http request: /loggertest')
        logger.info('Logger info request: /loggertest')
        logger.warning('Logger warning request: /loggertest')
        logger.error('Logger error request: /loggertest')
        logger.fatal('Logger fatal')

        // LO LOGGERS
        res.status(200).send(
            {
                message: "run all logger options"
            }
        )
    });

export default router;
