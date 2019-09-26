
/****
 * This object types the properties of the schemas that use String
 */
const typegStringUnique = {
    type: String,
    unique: true,
    default: ''
}

const typegStringNoUnique = {
    type: String,
    default: ''
}

/****
 * This object types the properties of the schemas that use Number
 */
const typeNumber = {
    type: Number,
    default: 0
}
/****
 * This object types the properties of the schemas that use Boolean
 */
const typeBoolean = {
    type: Boolean,
    default: true
}

/****
 * This object types the properties of the schemas that use Objects
 */
const typeObject = {
    type: Object
}

const Types = {
    typegStringUnique,
    typegStringNoUnique,
    typeNumber,
    typeBoolean,
    typeObject
};

export default Types;
