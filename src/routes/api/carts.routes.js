// const fs = require(`node:fs`)
const { Router } = require('express')
const CartsManagerMongo = require('../../dao/cartManagerMongo.js')

const router = Router()
const cartService = new CartsManagerMongo()

router.get('/', async (req, res) => {
  const carts = await cartService.getCarts()
  res.send(carts)
})

router.post('/', async (req, res) => {
  const cart = await cartService.createCart()
  res.send(cart)
})


router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params
    const cart = await cartService.addProductToCart(cid, pid)
    res.json(cart)
  } catch (error) {
    console.error('An error occurred while adding the product to the cart:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router