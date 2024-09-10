const { Schema, model } = require('mongoose')

const CartSchema = new Schema({
    userId: {
        type: String
    },
    products: []
})

const CartModel = model('cart', CartSchema)
module.exports = CartModel