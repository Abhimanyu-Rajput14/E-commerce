const express = require("express");
const ProductModel = require("../models/Product.model");
const ReviewModel = require("../models/Review.model");
const { validator, productValidator } = require("../middlewares/validator");
const { productSchema } = require("../validation/product");
const { isLoggedIn, isSeller } = require("../middlewares/auth");
const router = express.Router();

router.get("/products", async (req, res) => {
  const products = await ProductModel.find();
  res.render("products/list", {
    products,
  });
});

router.get("/products/new", isLoggedIn, isSeller, async (req, res) => {
  res.render("products/new");
});

router.get("/products/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id).populate("reviews");
  // console.log(product);
  res.render("products/show", { product });
});

router.post("/products", isLoggedIn, isSeller, validator(productSchema),
  async (req, res) => {
    const body = req.body; 
    await ProductModel.create(body);

    req.flash("success", "Product added successfully!");
    res.redirect("/products");
  }
);

router.get("/products/:id/edit", isLoggedIn, isSeller, async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  res.render("products/edit", { product });
});

router.put("/products/:id", isLoggedIn, isSeller, async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  // const product = await ProductModel.findByIdAndUpdate(id, body);
  const product = await ProductModel.findById(id);

  if (body.title) product.title = body.title;
  if (body.price) product.price = body.price;
  if (body.image) product.image = body.image;
  if (body.description) product.description = body.description;

  await product.save();

  req.flash("success", "Product updated successfully!");
  res.redirect("/products");
});

router.delete("/products/:id", isLoggedIn, isSeller, async (req, res) => {
  const { id } = req.params;

  // First, find the product and get its reviews
  const product = await ProductModel.findById(id);

  // Delete the associated reviews
  await ReviewModel.deleteMany({ _id: { $in: product.reviews } });

  // Then, delete the product
  await ProductModel.findByIdAndDelete(id);
  req.flash("success", "Product deleted successfully!");
  res.redirect("/products");
});

module.exports = router;
