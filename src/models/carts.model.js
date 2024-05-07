const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    products: [{
            id: { type: String, required: true },
            quantity: { type: Number, default: 1 }
        }]
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart