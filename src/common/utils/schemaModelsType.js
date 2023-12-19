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

const stringEmailTypeSchemaRequired = {
    type: String,
    required: true,
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};

const stringTypeSchemaNonUniqueRequiredRoleDefaultUser = {
    type: String,
    enum: ['user', 'admin', 'premium'],
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

const datetimeRequiredDefaultNow = {
        type: Date,
        required: true,
        default: Date.now
};

const datetimeNotRequiredDefaultNow = {
    type: Date,
    required: true,
    default: Date.now
};


export {
    arrayTypeSchemaNonUniqueRequired,
    numberTypeSchemaNonUniqueRequired,
    stringTypeSchemaNonUniqueRequired,
    stringTypeSchemaUniqueRequired,
    booleanTypeSchemaNonUniqueRequired,
    stringEmailTypeSchemaUniqueRequired,
    stringEmailTypeSchemaRequired,
    datetimeRequiredDefaultNow,
    stringTypeSchemaNonUniqueRequiredRoleDefaultUser,
    datetimeNotRequiredDefaultNow
};
