import express from "express";
import {
  addReview,
  createProduct,
  deleteProduct,
  deleteReview,
  getAllReviewsForAdmin,
  getProductById,
  getProductReviews,
  getProducts,
  searchProducts,
  updateProduct,
  updateReview,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/reviews/all", getAllReviewsForAdmin);

productRouter.post("/", createProduct);
productRouter.get("/", getProducts);
productRouter.get("/search/:query", searchProducts);

productRouter.get("/:productId/reviews", getProductReviews);
productRouter.post("/:productId/reviews", addReview);
productRouter.put("/:productId/reviews/:reviewId", updateReview);
productRouter.delete("/:productId/reviews/:reviewId", deleteReview);

productRouter.delete("/:productId", deleteProduct);
productRouter.put("/:productId", updateProduct);
productRouter.get("/:productId", getProductById);

export default productRouter;