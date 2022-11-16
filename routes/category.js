const express = require("express");
const Product = require('../models/product');
const Category = require('../models/category');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/uploads/')
    },
    filename: function (req, file, cb) {
        /*Appending extension with original name*/
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
});


// Create a new product
router.post('/:id/add', upload.single('image'), async (req, res) => {
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
            date: new Date(),
            image: req.file.originalname
        });
        res.redirect('/category/' + req.params.id)
    } catch (e) {
        console.log(e);
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


// Edit the current category and save the changes
router.post('/:categoryId/edit', async (req, res) => {
    try {
        await Category.updateOne({
            _id: req.params.categoryId
        }, {
            name: req.body.name
        });
        res.redirect('/category/' + req.params.categoryId)
    } catch (e) {
        console.log(e);
    }
});


// Delete selected category and all the products from it
router.post('/:categoryID/delete', async (req, res) => {
    try {
        // delete all products from the selected category
        const deletedProducts = await Product.deleteMany({
            category: req.params.categoryID
        });
        // delete selected category
        await Category.deleteOne({
            _id: req.params.categoryID
        });
        // render the page with all the categories
        res.redirect('/categories/');
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;