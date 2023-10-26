// Importar el módulo 'console'
// Importar el módulo 'fs'

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

export {
    CartProduct,
    Cart
};