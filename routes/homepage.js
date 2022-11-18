const express = require("express");
const Product = require("../models/product");
const helper = require('../public/js/helper');
const router = express.Router();

// Render descending the last 3 products added 
router.get("/", async (req, res) => {
    const lastProductsAdded = await Product
        .find({})
        .sort({
            "date": -1
        })
        .limit(3);
    const cheapestProducts = await Product
        .find({})
        .sort({
            "price": 1
        })
        .limit(3)
    res.render("index", {
        products: lastProductsAdded,
        cheapestProducts: cheapestProducts,
        helper: helper
    });
});

module.exports = router;