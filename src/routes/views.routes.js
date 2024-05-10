// const fs = require(`node:fs`)
const express = require('express')
const { productsModel } = require('../models/products.model');
const { chatsModel } = require('../models/chat.model')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await productsModel.find({})
        res.render('home', {
            products,
            styles: 'homeStyles.css'
        });
    } catch (error) {
        console.error("Error occurred while fetching products:", error);
        res.status(500).send("Internal server error");
    }
});

router.get('/realtimeprodcuts', async (req, res) => {
    try {
        const products = await productsModel.find({});
        res.render('realTimeProducts', {
            products,
            styles: 'homeStyles.css'
        });
    } catch (error) {
        console.error("Error occurred while fetching products:", error);
        res.status(500).send("Internal server error");
    }
});

router.get('/chat', async (req, res) => {
    try {
        const messages = await chatsModel.find({});
        res.render('chat', {
            messages,
            styles: 'homeStyles.css'
        });
    } catch (error) {
        console.error("Error occurred while fetching messages:", error);
        res.status(500).send("Internal server error");
    }
});

module.exports = router