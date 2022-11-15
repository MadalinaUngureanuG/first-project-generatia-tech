const express = require("express");
const Product = require("../models/product");
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


// Find and render one product by id
router.get("/:id", async (req, res) => {
    const product = await Product.findById({
        _id: req.params.id
    });
    res.render("product", {
        product: product
    });
});


// Edit the product and save the changes
router.post('/:id', upload.single('image'), async (req, res) => {
    try {
        await Product.updateOne({
            category: req.body.category,
            name: req.body.name,
            model: req.body.model,
            quantity: req.body.quantity,
            price: req.body.price,
            specifications: req.body.specifications,
            dimensions: req.body.dimensions,
            color: req.body.color,
            description: req.body.description,
            image: req.file.originalname
        });
        res.redirect('/product/' + req.params.id)
    } catch (e) {
        console.log(e);
    }
});


// Delete the current product and return to category page
router.post('/:productID/delete', async (req, res) => {
    try {
        //load product to find the category where is from
        const product = await Product.findById({
            _id: req.params.productID
        });
        // delete selected product
        await Product.deleteOne({
            _id: req.params.productID
        });
        // redirect the user to category's page where deleted product was part from
        res.redirect('/category/' + product.category);
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;