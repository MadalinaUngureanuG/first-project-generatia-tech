const express = require("express");
const Product = require("../models/product");
const helper = require('../public/js/helper');
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

// Render descending the last 3 products added 
router.get("/", upload.single('image'), async (req, res) => {
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