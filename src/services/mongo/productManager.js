import { productsModel } from './models/products.js';
class ProductManager {

    constructor() {
        console.log("hola productos")
    }

    addProduct = async ({title, description, price, thumbnail, code, stock}) => {
        try {

            console.log("add producto")


        } catch (error) {
            console.error(error)
        }
    }

    getProducts = () => {
        console.log("get all product")
        console.log(productsModel.find({}))
        return []
    }

    getProductById = async (id) => {
        console.log("get product x id")
    }

    updateProductById = async ({id, title, description, price, thumbnail, code, stock, status, category}) => {
        console.log('update product')
    }


    deleteProduct = async (id) => {

        console.log("delete p")
    }

}

export default ProductManager;