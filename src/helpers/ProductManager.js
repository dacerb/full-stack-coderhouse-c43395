// Importar el módulo 'console'
import { error } from 'console';

// Importar el módulo 'fs'
import { copyFileSync } from 'fs';
import fileSystem from 'fs';



class Product{
    constructor({title, description, price, thumbnail, id, code, stock}){
        this.id = id
        this.title = title
        this.description = description
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock 
        this.price = price 

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
        this.#productDirPath = "./files"
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

    updateProductById = async ({id, title, description, price, thumbnail, code, stock}) => {
        let all_products = await this.#getProdcutList()
        all_products.forEach(element => {
            if (element.id === id) {
                element.thumbnail = thumbnail
                element.description = description
                element.title = title
                element.description = 
                element.code = code
                element.stock = stock
                element.price = price
            }
        });
        await this.#writeFile(all_products)
    }
    

    deleteProduct = async (id) => {
        let all_products = await this.#getProdcutList()
        let new_list_products = all_products.filter((element) => element.id !== id)
        await this.#writeFile(new_list_products)
    }

}

export default ProductManager;

