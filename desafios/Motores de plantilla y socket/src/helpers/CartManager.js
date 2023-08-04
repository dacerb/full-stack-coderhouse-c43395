// Importar el módulo 'console'
import { error } from 'console';

// Importar el módulo 'fs'
import { copyFileSync } from 'fs';
import fileSystem from 'fs';


import __dirname from './utils.js'

console.log(__dirname)

class CartProduct {
    constructor({productId, qty}){
        this.productId = parseInt(productId)
        this.qty = parseInt(qty)
    }
}



class Cart{
    constructor({id, products}){
        this.id = parseInt(id)
        this.products = products

        //if (!(this.title.length > 1)) {
        //    throw new Error('debe incluir el titulo', this.title);
        //}
        //if (!(this.description.length > 1)) {
        //    throw new Error('debe incluir la descripcion', this.description);
        //}

    }
}


class CartManager{

    #products
    #cartsDirPath
    #cartstFilePath
    #fileSystem
    #codeAvailables

    constructor(){
        this.#products = new Array()
        this.#cartsDirPath = __dirname +"/db"
        this.#cartstFilePath = this.#cartsDirPath + "/carts.json"
        this.#fileSystem = fileSystem
    }

    #new_id = (elements) => {
        return elements.length + 1
    }

    #getCartsList = async () => {

        await this.#fileSystem.promises.mkdir(this.#cartsDirPath, { recursive: true})

        if (!this.#fileSystem.existsSync(this.#cartstFilePath)) {
            await this.#fileSystem.promises.writeFile(this.#cartstFilePath, "[]")
        }

        let productsFile = await this.#fileSystem.promises.readFile(this.#cartstFilePath, "utf-8")
        return JSON.parse(productsFile)

    }

    #writeFile = async (document) => {
        await this.#fileSystem.promises.writeFile(this.#cartstFilePath, JSON.stringify(document, null, 4))
    }

    addCart = async () => {
        try {

            this.#products = await this.#getCartsList()

            let id = this.#new_id(this.#products)
            let new_product = new Cart({
                id,
                products: []
            })

            this.#products.push(new_product)
            await this.#writeFile(this.#products)

            return id

        } catch (error) {
            console.error(error)
            return null
        }
    }


    getCartById = async (id) => {
        let x = new Array
        let all_carts = await this.#getCartsList()
        const found_cart = all_carts.filter((element) => element.id === id)?.[0]

        if (found_cart === undefined)
            return null
    
        if (Object.entries(found_cart).length > 0) return found_cart
        
    }

    addProductInCart = async (cartId, productId) => {

        let all_carts = await this.#getCartsList()
        let found_cart = false
        let product_wish_updated = false

        all_carts.forEach(cart => {
            if (cart.id === cartId) {
                found_cart = true
                cart.products.map(elements => {
                    if (elements.productId === productId ) {
                        elements.qty ++ 
                        product_wish_updated = true
                    }
                })

                if (!product_wish_updated) {
                    const new_cart_product = new CartProduct({
                        productId,
                        qty:1
                    })
                    cart.products.push(new_cart_product)
                    product_wish_updated = true
                }
            }
        });
        await this.#writeFile(all_carts)
        return found_cart && product_wish_updated
        
    }

}

export default CartManager;

/**
 *
 * 
 * 
 * 
 * 
 * 
    getProducts = () => {
        return this.#getCartsList()
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



 */