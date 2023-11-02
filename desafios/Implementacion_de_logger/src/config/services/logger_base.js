import winston, { transports } from "winston";
import config from "../config.js";
import __dirname from "../../common/utils/utils.js";

const LOGS_STORE = __dirname + "/event_logs"

//Custom logger options:
const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'blue',
        http: 'green',
        debug: 'white'
    }
};

//Custom Logger:
const devLogger = winston.createLogger({
    //Levels:
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console(
            {
                level: "debug",
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevelsOptions.colors }),
                    winston.format.simple()
                )
            }
        ),
        new winston.transports.File({ filename: LOGS_STORE + '/errors.develop.log', level: 'error' })
    ]
});

//Creating our logger:
const prodLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    //Declare transports:
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOptions.colors }),
                winston.format.simple()
            )}),
        new winston.transports.File({ filename: LOGS_STORE + '/errors.prod.log', level: 'error' })
    ]
});

//Declare a middleware:

export const addLogger = (req, res, next) => {
    const scope = config.environment
    const messageLogger = `${req.method} en ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}, SCOPE[${scope}]`

    if (scope === config.optionMode.production) {
        req.logger = prodLogger;
    } else {
        req.logger = devLogger;
    }
    req.logger.http(messageLogger)
    next();
};
