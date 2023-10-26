import __dirname from "../../../common/utils/utils.js";
import Product from "./models/products.js"
import fileSystem from "fs";

class ProductManager {

    #products
    #productDirPath
    #productFilePath
    #fileSystem
    #codeAvailables

    constructor() {
        this.#products = new Array()
        this.#productDirPath = __dirname + "/services/filesystem/db"
        this.#productFilePath = this.#productDirPath + "/products.json"
        this.#fileSystem = fileSystem
    }

    #new_id = (elements) => {
        return elements.length + 1
    }

    #getProdcutList = async () => {

        await this.#fileSystem.promises.mkdir(this.#productDirPath, {recursive: true})

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

    getProductById = async (_id) => {
        const id = parseInt(_id)
        let x = new Array
        let all_products = await this.#getProdcutList()
        return all_products.filter((element) => element.id === id)
    }

    updateProductById = async ({id: _id, title, description, price, thumbnail, code, stock, status, category}) => {
        const id = parseInt(_id)
        let all_products = await this.#getProdcutList()
        let found_product = false
        all_products.forEach(element => {
            if (element.id === id) {
                element.thumbnail = thumbnail.length > 0 ? thumbnail : element.thumbnail // Siempre va a haber una imagen para el producto
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


    deleteProduct = async (_id) => {
        const id = parseInt(_id)
        let product_was_deleted = false
        let all_products = await this.#getProdcutList()
        if (!all_products.length > 0) return product_was_deleted // no hay productos por ende imposible eliminar ningun caso
        let new_list_products = all_products.filter((element) => element.id !== id)
        await this.#writeFile(new_list_products)

        return all_products.length > new_list_products.length // Lista anterior tiene mas elementos que la lista nueva indica que fue borrado por lomenos un elemento o mas.
    }

}

export default ProductManager;