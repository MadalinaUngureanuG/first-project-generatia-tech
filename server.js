const express = require("express")
const mongoose = require("mongoose")
const homepageRouter = require("./routes/homepage")
const categoriesRouter = require("./routes/categories")
const categoryRouter = require("./routes/category")
const productRouter = require("./routes/product")
const expressLayouts = require("express-ejs-layouts")
const app = express()

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")

app.use(express.urlencoded({
    extended: false
}))
app.use(expressLayouts)
app.use(express.static("public"))

app.use("/", homepageRouter)
app.use("/homepage", homepageRouter)
app.use("/categories", categoriesRouter)
app.use("/category", categoryRouter)
app.use("/product", productRouter)

app.listen(5000)

mongoose.connect('mongodb+srv://madalina:YTnv3gq6hc7qcTEA@onlineshop2022.fadd6ci.mongodb.net/first_project')
    .then(() => console.log('DB connected'))
    .catch((error) => console.error('DB connection error!', error));