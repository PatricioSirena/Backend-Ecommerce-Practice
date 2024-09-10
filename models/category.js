const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    }
})

CategorySchema.methods.toJSON = function(){
    const {__v, ...category} = this.toObject()
    return category
}

const CategoryModel = model('category', CategorySchema)
module.exports = CategoryModel