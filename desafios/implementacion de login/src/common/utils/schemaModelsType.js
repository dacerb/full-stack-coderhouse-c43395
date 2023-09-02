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

const booleanTypeSchemaNonUniqueRequired = {
    type: Boolean,
    required: true
};


const arrayTypeSchemaNonUniqueRequired = {
    type: Array,
    required: true
};


export {
    arrayTypeSchemaNonUniqueRequired,
    numberTypeSchemaNonUniqueRequired,
    stringTypeSchemaNonUniqueRequired,
    stringTypeSchemaUniqueRequired,
    booleanTypeSchemaNonUniqueRequired
};