import express from 'express';
import morgan from "morgan";
import dotenv from "dotenv";
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import MongoStore from "connect-mongo";
import session from 'express-session';

// Import utilidades
import __dirname from './common/utils/utils.js';

// Import rutas
import productsRoutes from './routes/back.products.routes.js';
import homeRoutes from './routes/view.home.routes.js';
import cartRoutes from './routes/back.cart.routes.js';
import cartViewRoutes from "./routes/view.cart.routes.js";
import productsViewRoutes from "./routes/view.products.routes.js";
import apiViewRoutes from "./routes/view.api.routes.js";
import userViewRoutes from "./routes/view.users.routers.js";
import sessionsRouter from "./routes/back.session.routers.js";
// Connecion a db mongo
import "./services/mongo/db_connection.js";

// Carga de variables de entorno
dotenv.config();

// Constantes
const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const SECRET = process.env.SECRET_PHRASE;

// Configuracion de cookies
app.use(cookieParser());

// Configuracion de handlebars
app.engine('handlebars', handlebars.engine());

// Configuracion de applicacion
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Configura Handlebars y registra el ayudante personalizado
const hbs = handlebars.create({
    helpers: {
        formatThumbnailPath: function(filePath) {
            const prefixToRemove = 'D:\\CURSOS\\full-stack-coderhouse-c43395\\src\\public\\thumbnails\\';
            const removePath = '/thumbnails/' + filePath.replace(prefixToRemove, '');
            return removePath
        }
    }
});

// Usa el objeto 'hbs' para configurar el motor de plantillas
app.engine('handlebars', hbs.engine);

// Middelwares de aplicacion
app.use(express.static(__dirname + '/public'))

// Logs de las consultas a los endpoints
app.use(morgan("dev"));

// Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuracion de sessiones
app.use(session({
    store: MongoStore.create(
        {
            mongoUrl: MONGO_URL,
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
            ttl: 10
        }
    ),
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Configuracion de rutas de acceso
app.use('/api/products', productsRoutes);
app.use("/api/sessions", sessionsRouter);
app.use('/api/cart', cartRoutes);
app.use('/home', homeRoutes);
app.use('/cart', cartViewRoutes);
app.use('/products', productsViewRoutes);
app.use('/users', userViewRoutes);
app.use('/', apiViewRoutes);

// ------------------------ RUN APP
const httpServer = app.listen(PORT, () => {
    console.log(`server run on port: ${PORT}`);
})
