const express = require("express");
const Category = require('../models/category');
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

module.exports = router;