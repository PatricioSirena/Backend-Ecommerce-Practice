const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
    name: { 
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    price: { 
        type: Number,
        required: true 
    },
    description: {
        type: String,
        required: true 
    },
    active: { 
        type: Boolean, 
        default: false 
    },
    galery: {
        type: Array,
        default: []
    }
})

ProductSchema.methods.toJSON = function(){
    const {__v, ...product} = this.toObject()
    return product
}

const ProductModel = model('products', ProductSchema)
module.exports = ProductModel