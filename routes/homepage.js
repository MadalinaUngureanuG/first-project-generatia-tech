const express = require("express");
const Product = require("../models/product");
const router = express.Router();
const helper = require('../public/js/helper');

// Render descending the last 3 products added 

router.get("/", async (req, res) => {
    const products = await Product
        .find({})
        .sort({
            "date": -1
        })
        .limit(3)
    res.render("index", {
        products: products,
        helper: helper
    });
});

module.exports = router;