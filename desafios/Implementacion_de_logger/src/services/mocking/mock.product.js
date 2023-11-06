import { faker } from '@faker-js/faker';

// definicion de producto
const newMockProduct = () => {
    return{
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.alpha(10).toUpperCase(),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        stock: faker.number.int(500),
        category: faker.string.alpha(5),
        thumbnail: faker.image.avatar(),
    }
};

// generador de productos por cantidad
const generatorProductMockByQty = (qty) => {
    const aux = []
    for (let i = 1; i <= qty; i++) {
        aux.push(newMockProduct());
    }
    return aux;
}

export const MockingProducts = {
    generatorProductMockByQty
}

