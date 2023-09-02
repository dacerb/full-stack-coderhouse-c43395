import express from 'express';
import morgan from "morgan";
import dotenv from "dotenv";
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';

import productsRoutes from './routes/back.productsRoutes.js';
import homeRoutes from './routes/front.homeRoutes.js';
import cartRoutes from './routes/back.cartRoutes.js';
import cartFrontRoutes from "./routes/front.cartRoutes.js";
import productsFrontRoutes from "./routes/front.productsRoutes.js";

import __dirname from './common/utils/utils.js';

// connecion a db mongo
import "./services/mongo/db_connection.js";

// carga de variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT;


// configuracion de cookies
app.use(cookieParser());

// configuracion de handlebars
app.engine('handlebars', handlebars.engine());

// configuracion de applicacion
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Configura Handlebars y registra el ayudante personalizado
const hbs = handlebars.create({
    helpers: {
        formatThumbnailPath: function(filePath) {
            const prefixToRemove = 'D:\\CURSOS\\full-stack-coderhouse-c43395\\src\\public\\thumbnails\\';
            return '/thumbnails/' + filePath.replace(prefixToRemove, '');
        }
    }
});
// Usa el objeto 'hbs' para configurar el motor de plantillas
app.engine('handlebars', hbs.engine);

// Middelwares de aplicacion
app.use(express.static(__dirname + '/public'))

// logs de las consultas a los endpoints
app.use(morgan("dev"));

// preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configuracion de routas
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/home', homeRoutes);
app.use('/cart', cartFrontRoutes);
app.use('/products', productsFrontRoutes);

// ------------------------ RUN APP
app.get('/',  (req, res) => {
    const apiName = 'Desafio Motores de Plantilla y Socket';
    const endpoints = [
        { path: '/api/products?limit=10', verbo: 'GET', description: 'listar todos los productos de la base' },
        { path: '/api/products/:pid', verbo: 'GET',description: 'traer sólo el producto con el id proporcionado'},
        { path: '/api/products/:pid', verbo: 'PUT',description: 'deberá tomar un producto y actualizarlo por los campos enviados desde body'},
        { path: '/api/products/:pid', verbo: 'DELETE',description: 'deberá eliminar el producto con el pid indicado'},
        { path: '/api/products/', verbo: 'POST',description: 'deberá agregar un nuevo producto desde el payload', },
        { path: '/api/carts/', verbo: 'POST',description: 'deberá crear un nuevo carrito', curl: 'xxx' },
        { path: '/api/carts/:cid', verbo: 'GET',description: 'deberá listar los productos que pertenezcan al carrito con el parámetro cid', curl: "curl --location --request GET 'http://localhost:8080/api/cart/1'" },
        { path: '/api/carts/:cid/product/:pid ', verbo: 'POST',description: 'deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto'},
        { path: '/api/cart/cid', verbo: 'PUT',description: 'deberá poder actualizar la totalidad de los productos almacenados pasando la estructura completa de productId y qty'},
        { path: '/api/carts/:cid/product/:pid ', verbo: 'PUT',description: 'deberá poder actualizar la cantidad del productId proporcionado'},
        { path: '/api/carts/:cid/product/:pid ', verbo: 'POST',description: 'deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto'},
        { path: '/api/cart/cid', verbo: 'DELETE',description: 'deberá eliminar todos los productos del carrito'},
        { path: '/api/carts/:cid/product/:pid ', verbo: 'DELETE',description: 'deberá poder eliminar el producto del cartito'},
        //{ path: '/api/realtimeproducts/ ', verbo: 'GET',description: 'deberá listar en tiempo real los productos que hay disponibles, implementando socket, y renderizando con handlebars'},
        { path: '/home/ ', verbo: 'GET',description: 'deberá listar todos los productos que hay almacenados al momento de hacer el request'},
        { path: '/api/cart/cid ', verbo: 'GET',description: 'deberá listar todos los productos del cartId'},
        { path: '/products ', verbo: 'GET',description: 'deberá listar todos los productos existentes de forma paginada'}
    ];

    res.render('api', {
        apiName,
        endpoints,
        style: 'main.css'
    });
});



const httpServer = app.listen(PORT, () => {
    console.log(`server run on port: ${PORT}`);
})