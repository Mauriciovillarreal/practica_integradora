// const fs = require(`node:fs`)
const express = require('express');
const router = express.Router();
const Cart = require('../../models/carts.model.js')

router.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params
    const cart = await Cart.findById(cid)
    if (cart === null) {
      return res.status(404).json({ error: 'Cart not found' })
    }
    res.json(cart)
  } catch (error) {
    console.error("An error occurred while getting the cart:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

router.post('/', async (req, res) => {
  try {
    const newCart = new Cart({ products: [] })
    await newCart.save()
    res.json(newCart)
  } catch (error) {
    console.error("An error occurred while submitting the cart:", error)
    res.status(500).json({ error: "Internal server error" })
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid)
    if (cart === null) {
      return res.status(404).json({ error: 'Cart not found' })
    }
    const product = cart.products.find(product => product.id === pid)
    if (product) {
      product.quantity++
    } else {
      cart.products.push({ id: pid, quantity: 1 });
    }
    await cart.save()
    res.json(cart)
  } catch (error) {
    console.error('An error occurred while adding the product to the cart:', error)
    res.status(500).json({ error: "Internal server error" })
  }
});

module.exports = router


// router.get('/:cid', async (req, res) => {
//     try {
//         const { cid } = req.params
//         const productsCart = await cartManager.getCarts()
//         const cart = productsCart.find(cart => cart.id === parseInt(cid))
//         res.send(JSON.stringify(cart))
//     } catch (error) {
//         console.error("An error occurred while getting the cart:", error)
//         res.status(500).json({ error: "Internal server error" })
//     }
// })

// router.post('/', async (req, res) => {
//     try {
//         const productsCart = await cartManager.getCarts()
//         const id = Date.now()
//         const newCart = {
//             id,
//             products: []
//         }
//         productsCart.push(newCart)
//         await fs.promises.writeFile(path, JSON.stringify(productsCart, null, '\t'), 'utf-8')
//         res.send(newCart)
//     } catch (error) {
//         console.error("An error occurred while submitting the cart:", error)
//         res.status(500).json({ error: "Internal server error" })
//     }
// })

// router.post('/:cid/product/:pid', async (req, res) => {
//     try {
//       const { cid, pid } = req.params
//       const productsCart = await cartManager.getCarts()
//       const cart = productsCart.find((cart) => cart.id === parseInt(cid))
//       if (!cart) {
//         return res.status(404).send('Cart not found')
//       }
//       const product = cart.products.find((product) => product.id === parseInt(pid))
//       if (product) {
//         product.quantity++
//       } else {
//         cart.products.push({ id: parseInt(pid), quantity: 1 })
//       }
//       await fs.promises.writeFile(path, JSON.stringify(productsCart, null, '\t'), 'utf-8')
//       res.send(cart)
//     } catch (error) {
//       console.error('An error occurred while adding the product to the cart:', error)
//       res.status(500).send('Internal Server Error')
//     }
//   })

// module.exports = router