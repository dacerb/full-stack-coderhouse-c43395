import { productsModel } from './models/products.js';

class ProductManager {

    addProduct = async ({title, description, price, thumbnail, code, stock}) => {
         return productsModel.create({
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            })
             .then( newProduct => {
                    console.log("Add new product: ", newProduct);
                    return newProduct.toJSON();
                })
             .catch(error => {
                 console.error('Error:', error);
             });
    }

    getProducts = async () => {
        return productsModel.find({})
            .then(products => {
                    return products?.map(product => product.toJSON());
                }
            )
            .catch(error => {
                console.error('Error:', error);
            });
    }

    getProductsByPaginateQueryOptions = async (query, options) => {
        return productsModel.paginate(query, options)
            .then(products => {
                    return products;
                }
            )
            .catch(error => {
                console.error('Error:', error);
            });
    }

    getProductById = async (id) => {

        return productsModel.findOne({_id: id})
            .then(product => {
                    if (product) return product.toJSON();
                    return product;
                }
            )
            .catch(error => {
                console.error('Error:', error);
            });
    }

    updateProductById = async ({id, title, description, price, thumbnail, code, stock, status, category}) => {
        return productsModel.findByIdAndUpdate(id, {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category
        }, { new: true })
            .then(productUpdated => {
                    if (productUpdated) return productUpdated.toJSON();
                    return productUpdated;
                }
            )
            .catch(error => {
                console.error('Error:', error);
            });
    }

    deleteProduct = async (id) => {
        return productsModel.deleteOne({_id: id})
            .then(productDeleted => {
                    return Boolean(productDeleted.deletedCount)
                }
            )
            .catch(error => {
                console.error('Error:', error);
            });
    }

}

export default ProductManager;