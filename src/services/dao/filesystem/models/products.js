

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
export default Product
