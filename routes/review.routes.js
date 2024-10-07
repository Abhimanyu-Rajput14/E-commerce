const ProductModel = require("../models/Product.model");
const ReviewModel = require("../models/Review.model");
const { validator, reviewValidator } = require("../middlewares/validator");
const { reviewSchema } = require("../validation/product");

const router = require("express").Router();

router.post("/products/:productId/reviews", validator(reviewSchema), async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;

  const review = await ReviewModel.create({ rating, comment });

  //   const product = await ProductModel.findById(productId);
  //   product.reviews.push(review._id);
  //   await product.save();

  await ProductModel.updateOne(
    { _id: productId },
    { $addToSet: { reviews: review._id } }
  );

  res.redirect(`/products/${productId}`); // res.redirect('back');
});

// review.route.js
router.delete("/products/:productId/reviews/:reviewId", async (req, res) => {
  const { productId, reviewId } = req.params; // Get both product ID and review ID from URL parameters

  // Delete the review from the Review collection
  await ReviewModel.findByIdAndDelete(reviewId);

  // Remove the review reference from the product's reviews array
  await ProductModel.updateOne(
    { _id: productId },
    { $pull: { reviews: reviewId } } // Use $pull to remove the review ID from the array
  );

  res.redirect(`/products/${productId}`); // Redirect back to the product page
});

module.exports = router;
