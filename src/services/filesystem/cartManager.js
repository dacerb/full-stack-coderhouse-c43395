import { CartProduct, Cart } from './models/cart.js';
import __dirname from "../../common/utils/utils.js";
import fileSystem from "fs";

class CartManager {

    #products
    #cartsDirPath
    #cartstFilePath
    #fileSystem
    #codeAvailables

    constructor() {
        this.#products = new Array()
        this.#cartsDirPath = __dirname + "/services/filesystem/db"
        this.#cartstFilePath = this.#cartsDirPath + "/carts.json"
        this.#fileSystem = fileSystem
    }

    #new_id = (elements) => {
        return elements.length + 1
    }

    #getCartsList = async () => {

        await this.#fileSystem.promises.mkdir(this.#cartsDirPath, {recursive: true})

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

            let id = this.#new_id(this.#products);
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


    getCartById = async (_id) => {
        let id = parseInt(_id)
        let x = new Array
        let all_carts = await this.#getCartsList()
        const found_cart = all_carts.filter((element) => element.id === id)?.[0]

        if (found_cart === undefined)
            return null

        if (Object.entries(found_cart).length > 0) return found_cart

    }

    addProductInCart = async (_cartId, _productId) => {

        let  cartId = parseInt(_cartId)
        let productId = parseInt(_productId)

        let all_carts = await this.#getCartsList()
        let found_cart = false
        let product_wish_updated = false

        all_carts.forEach(cart => {
            if (cart.id === cartId) {
                found_cart = true
                cart.products.map(elements => {
                    if (elements.productId === productId) {
                        elements.qty++
                        product_wish_updated = true
                    }
                })

                if (!product_wish_updated) {
                    const new_cart_product = new CartProduct({
                        productId,
                        qty: 1
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