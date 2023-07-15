// IMPORTO CON REQUIERE
const express = require('express');
const ProductManager = require('../../Manejo de archivos/ProductManager');

// DECLARACION DE EXPRESS Y PORT
const app = express();
const PORT = 8080;

// Configuracion de template
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware para poder usar los req.query
app.use(express.urlencoded({ extended: true }));



// INSTANCIA DE CLASE GLOBAL PRODUCTS
const productManager = new ProductManager()


// PRODUCTS ENDPOINTS GETS
app.get('/products', async (req, res) => {
    
    const { limit } = req.query;
    const all_products = await productManager.getProducts();
    const limit_element = parseInt(limit);

    if (!isNaN(limit_element) && limit_element > 0) {
        const limit_products = all_products.slice(0, limit_element);
        return res.send(
            JSON.stringify(limit_products)
        );
    }

    return res.send(
        JSON.stringify(all_products)
    );
});


app.get('/products/:pid', async (req, res) => {

    let { pid } = req.params;
    const id = parseInt(pid);

    if (!isNaN(id) && id > 0) {
        let producto_by_id = await productManager.getProductById(id);
        return res.send(
            JSON.stringify(producto_by_id)
        );
    }


    return res.send(
        JSON.stringify({
            "message": "El parametro ID debe ser entero positivo."
        })
    );
});



// ------------------------ RUN APP

app.get('/',  (req, res) => {
    
    const apiName = 'Desafio Server con Express';
    const endpoints = [
        { path: '/products', description: '[Get] todos los productos' },
        { path: '/products?limit=1', description: '[Get] query parameter limit todos los valores deben ser numeros positivos' },
        { path: '/products/1', description: '[Get] path parameter debe ser un numero entero positivo' }
    ];

  res.render('template', { apiName, endpoints });
});

app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
})