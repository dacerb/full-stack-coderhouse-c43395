import mongoose from "mongoose";

//TODO: Implementar Modelo con Mongoose:

const collectionName = 'students';

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};
const numberTypeSchemaNonUniqueRequired = {
    type: Number,
    required: true
};
const arrayTypeSchemaNonUniqueRequired = {
    type: Array,
    required: true
};


const studentsSchema = new mongoose.Schema({
    name: stringTypeSchemaNonUniqueRequired,
    lastName: stringTypeSchemaNonUniqueRequired,
    age: numberTypeSchemaNonUniqueRequired,
    courses: arrayTypeSchemaNonUniqueRequired
});

export const studentModel = mongoose.model(collectionName, studentsSchema);
