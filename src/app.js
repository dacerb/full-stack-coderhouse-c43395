import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUIExpress from 'swagger-ui-express';

import morgan from "morgan";
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import MongoStore from "connect-mongo";
import session from 'express-session';
import default_config from './config/config.js'
import { addLogger } from "./config/services/logger_base.js";

// CONSTANTES
const app = express();
const PORT = default_config.port;
const MONGO_URL = default_config.mongoUrl;
const SECRET = default_config.secret;
const PREFIX_ADD = default_config.prefixAdd
const PATH_IMAGE_REMOVE = default_config.pathImagesRemove

const swaggerOption = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion API Ecommerce",
            description: "Documentacion para el uso de swagger"
        }
    },
    apis: [`./src/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOption);

// IMPORT CONFIG
import initializePassport from "./config/services/passport.config.js";
import MongoSingleton from './config/services/mongodb-singleton.js';


// IMPORT UTILS
import __dirname from './common/utils/utils.js';

// IMPORT ROUTES
import productsRoutes from './routes/back.products.routes.js';
import cartRoutes from './routes/back.cart.routes.js';
import userSessionsRouter from "./routes/back.user.sessions.routers.js";
import usersRouter from "./routes/back.user.routers.js";
import mockingProductsRouter from "./routes/back.mocking.products.router.js";
import loggerTestRouter from "./routes/back.logger.test.router.js"

import homeRoutes from './routes/view.home.routes.js';
import cartViewRoutes from "./routes/view.cart.routes.js";
import productsViewRoutes from "./routes/view.products.routes.js";
import apiViewRoutes from "./routes/view.api.routes.js";
import userViewRoutes from "./routes/view.users.routers.js";
import githubRouter from "./routes/view.github.routers.js";

// SERVICIOS
import passport from "passport";
import {Server} from "socket.io";

// CONFIGURACION DE SWAGGER
app.use('/api/docs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs))

// CONFIGURACION DE COOKIES
app.use(cookieParser());

// CONFIGURACION DE HANDLEVARS
app.engine('handlebars', handlebars.engine());

// CONFIGURACION DE APPLICACION
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Configura Handlebars y registra el ayudante personalizado
const hbs = handlebars.create({
    helpers: {
        formatThumbnailPath: function(filePath) {
            const removePath = PREFIX_ADD + filePath.replace(PATH_IMAGE_REMOVE, '');
            return removePath;
        },
        isAdminHelper: function(rol) {
            const is_admin = rol === 'admin';
            return is_admin
        }
    }
});

// Usa el objeto 'hbs' para configurar el motor de plantillas
app.engine('handlebars', hbs.engine);

// Configuracion de sessiones
app.use(session({
    store: MongoStore.create(
        {
            mongoUrl: MONGO_URL,
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
            ttl: 3600
        }
    ),
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Middelwares de aplicacion
app.use(express.static(__dirname + '/public'));

// Middleware Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Logs de las consultas a los endpoints
app.use(morgan("dev"));

// Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(addLogger)

// Configuracion de rutas de acceso
app.use('/api/products', productsRoutes);
app.use("/api/sessions", userSessionsRouter);
app.use("/api/users", usersRouter);
app.use('/api/cart', cartRoutes);
app.use('/home', homeRoutes);
app.use('/cart', cartViewRoutes);
app.use('/products', productsViewRoutes);
app.use('/users', userViewRoutes);
app.use('/github', githubRouter);
app.use('/mockingproducts', mockingProductsRouter);
app.use('/loggerTest', loggerTestRouter);
app.use('/', apiViewRoutes);

// ------------------------ RUN APP
const httpServer = app.listen(PORT, () => {
    console.log(`server run on port: ${PORT}`);
})

// ------------------------ CONEXION CON MONGO
const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.error(error);
    }
};
mongoInstance();

// WEB Socket Server CHAT
let messages = []
const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {

    socket.on('message', data => {
        messages.push(data);
        socketServer.emit('messageLogs', messages);
    })

    socket.on('userConnected', data => {
        socket.broadcast.emit('userConnected', data.user);
        socketServer.emit('messageLogs', messages);
    })

    // socket.disconnect()
    socket.on('closeChat', data => {
        if (data.close === 'close')
            socket.disconnect();
    })

})
