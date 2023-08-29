import express from 'express';
import morgan from "morgan";
import dotenv from "dotenv";
import handlebars from 'express-handlebars';

import productsRoutes from './routes/productsRoutes.js';
import homeRoutes from './routes/homeRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import cartFrontRoutes from "./routes/cartFrontRoutes.js";
import productsFrontRoutes from "./routes/productsFrontRoutes.js";

import __dirname from './common/utils/utils.js';

// connecion a db mongo
import "./services/mongo/db_connection.js";

// carga de variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// configuracion de handlebars
app.engine('handlebars', handlebars.engine());

// configuracion de applicacion
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

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
        { path: '/api/realtimeproducts/ ', verbo: 'GET',description: 'deberá listar en tiempo real los productos que hay disponibles, implementando socket, y renderizando con handlebars'},
        { path: '/home/ ', verbo: 'GET',description: 'Deberá listar todos los productos que hay almacenados al momento de hacer el request'}
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