const express = require("express");
const Product = require("../models/product");
const router = express.Router()

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

router.post('/:id', async (req, res) => {
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
            description: req.body.description
        });
        res.redirect('/product/' + req.params.id)
    } catch (e) {
        console.log(e);
    }
});


// Delete the current product and return to category page
router.delete('product/:id', async (req, res) => {
    const Product = request.params.id;
});

// await Product.deleteOne({
//     _id: req.params.id
// })
// res.redirect('category')

// await Product.deleteOne({
//     _id: req.body.id
// }).then(function () {
//     console.log("Blog deleted"); // Success
//     res.redirect("category");
// }).catch(function (error) {
//     console.log(error); // Failure
// });

// } catch (e) {
// console.log(e);
// }
module.exports = router;