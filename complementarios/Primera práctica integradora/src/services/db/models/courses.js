import mongoose from "mongoose";
//TODO: Completar Modelo con Mongoose:


const collectionName = 'courses';

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


const courseSchema = new mongoose.Schema({
    title: stringTypeSchemaNonUniqueRequired,
    description: stringTypeSchemaNonUniqueRequired,
    teacherId: numberTypeSchemaNonUniqueRequired,
    students: arrayTypeSchemaNonUniqueRequired
});




// exportar
export const coursesModel = mongoose.model(collectionName, courseSchema);
