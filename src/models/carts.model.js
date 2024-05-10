const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
            default: 1
        },
        name: String
    }]
});

const cartModel = mongoose.model('Cart', cartSchema);

module.exports = { cartsModel: cartModel };