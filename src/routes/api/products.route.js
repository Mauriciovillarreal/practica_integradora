// const fs = require(`node:fs`)
const { Router } = require('express')
const ProductsManagerMongo = require('../../dao/productsManagerMongo.js')

const router = Router()
const productsService = new ProductsManagerMongo()

router.get('/', async (req, res) => {
    const products = await productsService.getProducts(res)
    res.send({ status: 'success', data: products })
})

router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    const result = await productsService.getProductsById(pid, res)
    res.send({ status: 'success', data: result })
})

router.post('/', async (req, res) => {
    const productData = req.body
    const result = await productsService.createProduct(productData, res)
    res.status(201).json({ status: 'success', data: result })
})

router.put('/:pid', async (req, res) => {
    const { pid } = req.params
    const { name, description, code, price, stock, category, thumbnails } = req.body
    const updateData = {
        name: name || undefined,
        description: description || undefined,
        code: code || undefined,
        price: price || undefined,
        stock: stock || undefined,
        category: category || undefined,
    }
    const result = await productsService.updateProductById(pid, updateData, res)
    res.json(result)
})

router.delete('/:pid', async (req, res) => {
        const { pid } = req.params
        const result = await productsService.deleteProductById(pid, res)
        res.json({ message: "Product deleted successfully", data: result })

})

module.exports = router