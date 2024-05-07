// const fs = require(`node:fs`)
const { Router } = require('express')
const { productsModel } = require('../../models/products.model')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const products = await productsModel.find({})
        res.send({ status: 'success', data: products })
    } catch (error) {
        console.error("Error occurred while getting products:", error)
        res.status(500).json({ error: "Internal server error" })
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid
        const product = await productsModel.findById(productId)
        if (!product) {
            return res.status(404).json({ error: 'Product not found' })
        }
        res.json(product)
    } catch (error) {
        console.error("Error occurred while getting product:", error)
        res.status(500).json({ error: "Internal server error" })
    }
})

router.post('/', async (req, res) => {
    const { body } = req
    const result = await productsModel.create(body)
    res.send({ status: 'success', data: result })
})

router.put('/:pid', async (req, res, next) => {
    try {
        const { pid } = req.params
        const { name, description, code, price, stock, category, thumbnails } = req.body
        if (!name && !description && !code && !price && !stock && !category) {
            return res.status(400).json({ error: "No fields provided to update" })
        }
        const updatedProduct = await productsModel.findByIdAndUpdate(pid, {
            name: name || undefined,
            description: description || undefined,
            code: code || undefined,
            price: price || undefined,
            stock: stock || undefined,
            category: category || undefined,
        }, { new: true })
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" })
        }
        res.json(updatedProduct)
    } catch (error) {
        console.error("Error occurred while updating product:", error)
        res.status(500).json({ error: "Internal server error" })
    }
})


router.delete('/:pid', async (req, res, next) => {
    try {
        const { pid } = req.params
        const deletedProduct = await productsModel.findByIdAndDelete(pid)
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" })
        }
        res.json({ message: "Product deleted successfully", deletedProduct })
    } catch (error) {
        console.error("Error occurred while deleting product:", error)
        res.status(500).json({ error: "Internal server error" })
    }
})

module.exports = router