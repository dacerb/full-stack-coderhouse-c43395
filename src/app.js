import express from 'express';
import productsRoutes from './routes/products.routes.js'
import cartRoutes from './routes/cart.routes.js'
import __dirname from './utils.js'

const app = express();
const PORT = 8080;


// Configuracion de template
app.set('view engine', 'ejs');
app.set('views', __dirname +'/views/apiHome');

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);




// ------------------------ RUN APP
app.get('/',  (req, res) => {
    const apiName = 'Desafio Server con Express';
    const endpoints = [
        { path: '/api/products?limit=10', verbo: 'GET', description: 'listar todos los productos de la base' },
        { path: '/api/products/:pid', verbo: 'GET',description: 'traer sólo el producto con el id proporcionado'},
        { path: '/api/products/:pid', verbo: 'PUT',description: 'deberá tomar un producto y actualizarlo por los campos enviados desde body'},
        { path: '/api/products/:pid', verbo: 'DELETE',description: 'deberá eliminar el producto con el pid indicado'},
        { path: '/api/products/', verbo: 'POST',description: 'deberá agregar un nuevo producto desde el payload', },
        { path: '/api/carts/', verbo: 'POST',description: 'deberá crear un nuevo carrito', curl: 'xxx' },
        { path: '/api/carts/:cid', verbo: 'GET',description: 'deberá listar los productos que pertenezcan al carrito con el parámetro cid', curl: "curl --location --request GET 'http://localhost:8080/api/cart/1'" },
        { path: '/api/carts/:cid/product/:pid ', verbo: 'POST',description: 'deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto'}
    ];

    res.render('template_api_home', { apiName, endpoints });
});


app.listen(PORT, () => {
    console.log(`server run on port: ${PORT}`);
})