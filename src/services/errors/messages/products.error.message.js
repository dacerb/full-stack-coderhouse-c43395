// HAY QUE PONER MAYOR INFORMACION DE LOS DATOS ACEPTADOS
const schemmaError = (obj) => {
    return `there are problems with the data received.
        DATA:
            -> : ${obj.thumbnail}
            -> : ${obj.title}
            -> : ${obj.description}
            -> : ${obj.code}
            -> : ${obj.price}
            -> : ${obj.status}
            -> : ${obj.stock}
            -> : ${obj.category}
    `;
};
export const ProductsErrMessage = {
    schemmaError,
};