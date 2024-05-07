const { Schema, model } = require('mongoose')

const productsSchema = new Schema ({
    name: String,
    description: String,
    code: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnails: String,
})

const productsModel = model('products', productsSchema)

module.exports = {
    productsModel
}