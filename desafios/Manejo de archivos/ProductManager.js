


class Product{
    constructor({title, description, price, thumbnail, id, code, stock}){
        this.id = id
        this.title = title
        this.description = description
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock 
        this.price = price 

        if (!(this.title.length > 1)) {
            throw new Error('debe incluir el titulo', this.title);
        }
        if (!(this.description.length > 1)) {
            throw new Error('debe incluir la descripcion', this.description);
        }
        if (!(this.thumbnail.length > 1)) {
            throw new Error('debe incluir la imagen', this.thumbnail);
        }
        if (!(this.thumbnail.length > 1)) {
            throw new Error('debe incluir el codigo', this.code);
        }
        if (!(typeof this.stock === 'number')) {
            throw new Error('debe incluir el stock', this.stock);
        }
        if (!(typeof this.price === 'number')) {
            throw new Error('debe incluir el price', this.price);
        }

    }
}

class ProductManager{

    constructor({path}){
        this.path = path
        this._idControl = []
    }

    #new_id = () => {
        return this._idControl.length + 1
    }

    addProduct = ({title, description, price, thumbnail, code, stock}) => {
        console.log("add producto a partir del objeto")

        let id = this.#new_id()
        let product = new Product(
            {
                title, 
                description, 
                thumbnail, 
                price,
                code, 
                stock,
                id
            }
        )

        console.log(product)

    }

    getProducts = (id) => {
        console.log("get all")
    }

    getProductById = (id) => {
        console.log("get by id")
    }

    updateProduct = (id) => {
        console.log("update")
    }
    

    deleteProduct = (id) => {
        console.log("delete")
    }

}


// ########################  INSTANCIA DE CLASE
let productManager = new ProductManager("./fs/");

console.log('########################  AGREGAR PROD')
productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price:200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
}
)

console.log("########################  CONSULTAR TODOS LOS PRODUCTOS")
productManager.getProducts()

console.log("########################  CONSULTAR PRODUCTOS POR ID")
productManager.getProductById(1)

console.log('########################  BORRAR PRODUCTO POR ID')
productManager.deleteProduct(1)

console.log('########################  ACTUALIZAR PRODICTO POR ID')
productManager.updateProduct(1)
