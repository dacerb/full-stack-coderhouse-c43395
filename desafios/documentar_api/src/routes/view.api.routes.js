import router from "./view.cart.routes.js";

router.get('/', async(req,res)=>{
    const user =  req.session.user;
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
        { path: '/products ', verbo: 'GET',description: 'deberá listar todos los productos existentes de forma paginada'},
        { path: '/users/ ', verbo: 'GET',description: 'deberá listar informacion del perfil del usuario'},
        { path: '/users/login/ ', verbo: 'GET',description: 'deberá permitir acceder al usuario una vez autenticado'},
        { path: '/users/register/ ', verbo: 'GET',description: 'deberá permitir registrar neuvos usuarios'},
        { path: '/users/logout/ ', verbo: 'GET',description: 'deberá permitir deslogear al usuario'},
        { path: '/api/sessions/fail-register/ ', verbo: 'GET',description: 'deberá mostrar un mensaje de error'},
        { path: '/api/sessions/fail-login/ ', verbo: 'GET',description: 'deberá mostrar un mensaje de error'},
        { path: '/github/error/ ', verbo: 'GET',description: 'deberá mostrar un mensaje de error'},
        { path: '/github/login/ ', verbo: 'GET',description: 'deberá mostrar el form para logear con github'},
        { path: '/loggertest ', verbo: 'GET',description: 'Test del logger'}
    ];

    return res.render('api', {
        apiName,
        endpoints,
        user,
        sessionActive: req.session.user,
        style: 'main.css'
    });
});

export default router;
