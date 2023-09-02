import { productModel } from './models/product.model.js';

class ProductManager {

    addProduct = async ({title, description, price, thumbnail, code, stock, category, status}) => {
         return productModel.create({
                title,
                description,
                price,
                thumbnail,
                status,
                category,
                code,
                stock
            })
             .then( newProduct => {
                    return newProduct;
                })
             .catch(error => {
                 // console.error('Error:', error);
                 throw error;
             });
    }

    getProducts = async () => {
        return productModel.find({})
            .then(products => {
                    return products?.map(product => product.toJSON());
                }
            )
            .catch(error => {
                console.error('Error:', error);
            });
    }

    getProductsByPaginateQueryOptions = async (query, options) => {
        return productModel.paginate(query, options)
            .then(products => {
                    return products;
                }
            )
            .catch(error => {
                console.error('Error:', error);
            });
    }

    getProductById = async (id) => {

        return productModel.findOne({_id: id})
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
        return productModel.findByIdAndUpdate(id, {
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
        return productModel.deleteOne({_id: id})
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