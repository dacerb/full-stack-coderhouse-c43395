


const list_of_product = [
    {
        title:"Producto 1",
        description:"Este es el producto numero 1",
        thumbnail:"/imagen_1.jpg",
        stock: 0
    },
    {
        title:"Producto 2",
        description:"Este es el producto numero 2",
        thumbnail:"/imagen_2.jpg",
        stock:20
    },
    {
        title:"Producto 3",
        description:"Este es el producto numero 3",
        thumbnail:"/imagen_3.jpg",
        stock:30
    },
    {
        title:"Producto 4",
        description:"Este es el producto numero 4",
        thumbnail:"/imagen_3.jpg",
        stock: 1
    }
]


class Product{
    constructor(title, description, thumbnail, code, stock){
        this.title = title
        this.description = description
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock 

        if (!(this.title.length > 1)) {
            throw new Error('debe incluir el titulo', this.title);
        }
        if (!(this.description.length > 1)) {
            throw new Error('debe incluir la descripcion', this.description);
        }
        if (!(this.thumbnail.length > 1)) {
            throw new Error('debe incluir la imagen', this.thumbnail);
        }

        if (!(typeof this.code === 'number')) {
            throw new Error('debe incluir el codigo', this.code);
        }
        if (!(typeof this.stock === 'number')) {
            throw new Error('debe incluir el stock', this.stock);
        }
    }
}

class ProductManager{

    constructor(){
        this.products = []
        this._codeControl = []
    }

    _new_id = () => {
        return this._codeControl.length + 1
    }

    addProduct = ({title, description, thumbnail, stock}) => {
        try {
            let code = this._new_id()
            let product = new Product(
                title, 
                description, 
                thumbnail, 
                code, 
                stock
            )
            this.products.push({...product})
            this._codeControl.push(code)
            console.log(`se agrego productos el codigo es: ${code}`)
        } catch (error) {
            console.error("no fue posible agregar el producto: " + error);
        }
    }

    getProductById = (code) => {
        console.log("buscar producto por id: ", code)

        let found_product = this.products.filter((product) => {
            return product.code === code
        })

        if (!found_product.length) {
            console.error("Not found") 
            return
        }

        return found_product
    }

    getProducts = () => {
        console.log("obtener productos")
        return this.products
    }
}

let productManager = new ProductManager();

list_of_product.map(product_item => {
    productManager.addProduct(product_item)
})



console.log(productManager)
console.log("--------------------------------------------------------")
console.log(productManager.getProductById(id=4))

console.log("--------------------------------------------------------")
console.log(productManager.getProducts())