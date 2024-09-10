const { Schema, model } = require('mongoose')

const FavoriteSchema = new Schema({
    userId: {
        type: String
    },
    products: []
})

const FavoriteModel = model('favorite', FavoriteSchema)
module.exports = FavoriteModel