
const { copyFileSync } = require('fs')
const ProductManager = require('./ProductManager')
let productManager = new ProductManager()



let saveProduct = async () => {

    console.log("listo todos los productos actuales")
    let productos_actuales = await productManager.getProducts()
    console.log( productos_actuales )



    console.log("agrego 4 productos y listo todos los productos ")
    await productManager.addProduct({
        title: "producto 1",
        description: "detalle de producto",
        price:100,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 15
    })
    await productManager.addProduct({
        title: "producto 2",
        description: "detalle de producto",
        price:200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    })
    await productManager.addProduct({
        title: "producto 3",
        description: "detalle de producto",
        price:300,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 35
    })
    await productManager.addProduct({
        title: "producto 4",
        description: "detalle de producto",
        price:400,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 45
    })

    console.log("listo todos los productos una vez agregados")
    let productos_despues_de_agregar = await productManager.getProducts()
    console.log( productos_despues_de_agregar )


    console.log("busco producto por el id 2")
    let producto_by_id = await productManager.getProductById(2)
    console.log( producto_by_id )

    console.log("Elimino el producto con id 1")
    productManager.deleteProduct(1)

    console.log("Actualizo producto con id 3")
    await productManager.updateProductById({
            id: 3,
            title: "SE ACTUALIZA PRODUCTO",
            description: "Este es un producto prueba actualizado",
            price:200000000,
            thumbnail: "Sin imagen",
            code: "12321",
            stock: 25
        })

    


    console.log("Muestro el ultimo estado de productos")
    let productos_ultimo_estado = await productManager.getProducts()
    console.log( productos_ultimo_estado )

}


saveProduct()