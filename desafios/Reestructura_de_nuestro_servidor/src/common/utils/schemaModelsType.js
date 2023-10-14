const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const stringEmailTypeSchemaUniqueRequired = {
    type: String,
    required: true,
    unique: true,
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};

const stringTypeSchemaNonUniqueRequiredRoleDefaultUser = {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
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
    booleanTypeSchemaNonUniqueRequired,
    stringEmailTypeSchemaUniqueRequired,
    stringTypeSchemaNonUniqueRequiredRoleDefaultUser
};