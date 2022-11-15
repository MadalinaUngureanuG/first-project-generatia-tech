const express = require("express");
const Category = require('../models/category');
const Product = require("../models/product");
const router = express.Router();


// Create a new category
router.post('/', async (req, res) => {
    try {
        await Category.create({
            name: req.body.name,
            quantity: req.body.quantity
        });
        res.redirect("/categories");
    } catch (e) {
        console.log(e);
    }
});


// Find and render all categories in one page
router.get('/', async (req, res) => {
    const categories = await Category.aggregate([{
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category",
                as: "productsNo"
            }
        },
        {
            $project: {
                productsNo: {
                    $size: "$productsNo"
                },
                name: "$name"
            }
        }
    ])
    res.render("categories", {
        categories: categories
    });
});


// Delete the current category and all the products from it
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
        // render the current page without the deleted category
        res.redirect('/categories/');
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;