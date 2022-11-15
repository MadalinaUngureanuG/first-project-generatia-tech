const express = require("express");
const Product = require('../models/product');
const Category = require('../models/category');
const router = express.Router();


// Create a new product
router.post('/', async (req, res) => {
    try {
        await Product.create({
            category: req.body.category,
            name: req.body.name,
            model: req.body.model,
            quantity: req.body.quantity,
            price: req.body.price,
            specifications: req.body.specifications,
            dimensions: req.body.dimensions,
            color: req.body.color,
            description: req.body.description,
            date: new Date()
        });
        const products = await getProducts();
        res.render("products", {
            products: products
        });
    } catch (e) {
        console.log(e);
        res.render("products");
    }
});


// Find and render all products from one category
router.get('/:id', async (req, res) => {
    const products = await Product.find({
        category: req.params.id
    });
    const categories = await Category.find({});
    // selectedCategory - it's for identifying the current category selected
    const selectedCategory = await Category.findById({
        _id: req.params.id
    });
    res.render("category", {
        products: products,
        categories: categories,
        data: selectedCategory
    })
});

module.exports = router;