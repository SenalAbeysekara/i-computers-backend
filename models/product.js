import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    altNames: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
    labelledPrice: {
      type: Number,
    },
    category: {
      type: String,
      default: "Others",
    },
    images: {
      type: [String],
      default: ["/images/default-product-1.png", "/images/default-product-2.png"],
    },
    isVisible: {
      type: Boolean,
      default: true,
      required: true,
    },
    brand: {
      type: String,
      default: "Generic",
    },
    model: {
      type: String,
      default: "Standard",
    },
    qty: {
      type: Number,
      default: 100,
    },
    reviews: {
      type: [reviewSchema],
      default: [],
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;