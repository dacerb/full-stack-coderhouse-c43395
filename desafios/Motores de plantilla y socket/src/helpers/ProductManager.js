// Importar el módulo 'console'
import { error } from 'console';

// Importar el módulo 'fs'
import { copyFileSync } from 'fs';
import fileSystem from 'fs';


import __dirname from './utils.js'

console.log(__dirname)


class Product{
    constructor({title, description, price, thumbnail, id, code, stock, status = true, category}){
        this.id = parseInt(id)
        this.title = title
        this.description = description
        this.code = code
        this.price = parseFloat(price) 
        this.status = Boolean(status)
        this.stock = parseInt(stock) 
        this.category = category 
        this.thumbnail = thumbnail

        //if (!(this.title.length > 1)) {
        //    throw new Error('debe incluir el titulo', this.title);
        //}
        //if (!(this.description.length > 1)) {
        //    throw new Error('debe incluir la descripcion', this.description);
        //}
        //if (!(this.thumbnail.length > 1)) {
        //    throw new Error('debe incluir la imagen', this.thumbnail);
        //}
        //if (!(this.thumbnail.length > 1)) {
        //    throw new Error('debe incluir el codigo', this.code);
        //}
        //if (!(typeof this.stock === 'number')) {
        //    throw new Error('debe incluir el stock', this.stock);
        //}
        //if (!(typeof this.price === 'number')) {
        //    throw new Error('debe incluir el price', this.price);
        //}

    }
}
class ProductManager{

    #products
    #productDirPath
    #productFilePath
    #fileSystem
    #codeAvailables

    constructor(){
        this.#products = new Array()
        this.#productDirPath = __dirname +"/db"
        this.#productFilePath = this.#productDirPath + "/products.json"
        this.#fileSystem = fileSystem
    }

    #new_id = (elements) => {
        return elements.length + 1
    }

    #getProdcutList = async () => {

        await this.#fileSystem.promises.mkdir(this.#productDirPath, { recursive: true})

        if (!this.#fileSystem.existsSync(this.#productFilePath)) {
            await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]")
        }

        let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8")
        return JSON.parse(productsFile)

    }

    #writeFile = async (document) => {
        await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(document, null, 4))
    }

    addProduct = async ({title, description, price, thumbnail, code, stock}) => {
        try {

            this.#products = await this.#getProdcutList()

            let id = this.#new_id(this.#products)
            let new_product = new Product(
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

            this.#products.push(new_product)
            await this.#writeFile(this.#products)

            return id


        } catch (error) {
            console.error(error)
        }
    }

    getProducts = () => {
        return this.#getProdcutList()
    }

    getProductById = async (id) => {
        let x = new Array
        let all_products = await this.#getProdcutList()
        return all_products.filter((element) => element.id === id)
    }

    updateProductById = async ({id, title, description, price, thumbnail, code, stock, status, category}) => {
        let all_products = await this.#getProdcutList()
        let found_product = false
        all_products.forEach(element => {
            if (element.id === id) {
                element.thumbnail = thumbnail.length > 0 ? thumbnail :  element.thumbnail // Siempre va a haber una imagen para el producto
                element.description = description
                element.title = title
                element.status = Boolean(status)
                element.category = category
                element.code = code
                element.stock = parseInt(stock)
                element.price = parseFloat(price)

                found_product = true
            }
        });
        await this.#writeFile(all_products)
        return found_product
    }
    

    deleteProduct = async (id) => {

        let product_was_deleted = false
        let all_products = await this.#getProdcutList()
        console.log(typeof(id))
        if (!all_products.length > 0) return product_was_deleted // no hay productos por ende imposible eliminar ningun caso
        console.log("PASE")
        let new_list_products = all_products.filter((element) => element.id !== id)
        await this.#writeFile(new_list_products)

        return all_products.length > new_list_products.length // Lista anterior tiene mas elementos que la lista nueva indica que fue borrado por lomenos un elemento o mas.
    }

}

export default ProductManager;

