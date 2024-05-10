const { cartsModel } = require('../models/carts.model.js')
const { productsModel } = require('../models/products.model.js')

class CartsManagerMongo {
    constructor() {
        this.model = cartsModel
    }

    getCarts = async () => {
        return await this.model.find()
    }

    createCart = async () => {
        return await this.model.create({ products: [] })
    }

    addProductToCart = async (cartId, productId) => {
        try {
            const cart = await this.model.findById(cartId)
            if (!cart) {
                throw new Error('Cart not found')
            }
            const product = await productsModel.findById(productId)
            if (!product) {
                throw new Error('Product not found')
            }
            const existingProductIndex = cart.products.findIndex(product => product.product.toString() === productId)
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity++
            } else {
                cart.products.push({ product: productId, quantity: 1, name: product.name })
            }

            await cart.save()
            return cart
        } catch (error) {
            throw new Error('Error while adding product to cart: ' + error.message)
        }
    }
}

module.exports = CartsManagerMongo