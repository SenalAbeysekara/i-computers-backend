import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

function updateProductRatingSummary(product) {
  const reviews = product.reviews || [];
  const reviewCount = reviews.length;

  if (reviewCount === 0) {
    product.averageRating = 0;
    product.reviewCount = 0;
    return;
  }

  const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
  product.averageRating = Number((total / reviewCount).toFixed(1));
  product.reviewCount = reviewCount;
}

export async function createProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({ message: "Access denied. Admins only." });
    return;
  }

  try {
    const existingProduct = await Product.findOne({
      productId: req.body.productId,
    });

    if (existingProduct) {
      res.status(400).json({ message: "Product with given productId already exists" });
      return;
    }

    const data = {};
    data.productId = req.body.productId;

    if (req.body.name == null) {
      res.status(400).json({ message: "Product name is required" });
      return;
    }

    data.name = req.body.name;
    data.description = req.body.description || "";
    data.altNames = req.body.altNames || [];

    if (req.body.price == null) {
      res.status(400).json({ message: "Product price is required" });
      return;
    }

    data.price = req.body.price;
    data.labelledPrice = req.body.labelledPrice || req.body.price;
    data.category = req.body.category || "Others";
    data.images = req.body.images || [
      "/images/default-product-1.png",
      "/images/default-product-2.png",
    ];
    data.isVisible = req.body.isVisible;
    data.brand = req.body.brand || "Generic";
    data.model = req.body.model || "Standard";
    data.reviews = [];
    data.averageRating = 0;
    data.reviewCount = 0;

    const newProduct = new Product(data);

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
}

export async function getProducts(req, res) {
  console.log("Get products api called");
  try {
    if (isAdmin(req)) {
      const products = await Product.find();
      res.status(200).json(products);
    } else {
      const products = await Product.find({ isVisible: true });
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
}

export async function deleteProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({ message: "Access denied. Admins only." });
    return;
  }

  try {
    const productId = req.params.productId;

    await Product.deleteOne({ productId: productId });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
}

export async function updateProduct(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({ message: "Access denied. Admins only." });
    return;
  }

  try {
    const productId = req.params.productId;

    const data = {};

    if (req.body.name == null) {
      res.status(400).json({ message: "Product name is required" });
      return;
    }

    data.name = req.body.name;
    data.description = req.body.description || "";
    data.altNames = req.body.altNames || [];

    if (req.body.price == null) {
      res.status(400).json({ message: "Product price is required" });
      return;
    }

    data.price = req.body.price;
    data.labelledPrice = req.body.labelledPrice || req.body.price;
    data.category = req.body.category || "Others";
    data.images = req.body.images || [
      "/images/default-product-1.png",
      "/images/default-product-2.png",
    ];
    data.isVisible = req.body.isVisible;
    data.brand = req.body.brand || "Generic";
    data.model = req.body.model || "Standard";

    await Product.updateOne({ productId: productId }, data);

    res.status(201).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
}

export async function getProductById(req, res) {
  console.log("Get product by id api called");
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ productId: productId });

    if (product == null) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    if (!product.isVisible) {
      if (!isAdmin(req)) {
        res.status(404).json({ message: "Product not found." });
        return;
      }
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
}

export async function searchProducts(req, res) {
  const query = req.params?.query || "";

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { altNames: { $elemMatch: { $regex: query, $options: "i" } } },
      ],
      isVisible: true,
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error searching products", error: error.message });
  }
}

export async function getProductReviews(req, res) {
  try {
    const product = await Product.findOne({ productId: req.params.productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!product.isVisible && !isAdmin(req)) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      reviews: product.reviews.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ),
      averageRating: product.averageRating || 0,
      reviewCount: product.reviewCount || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error: error.message });
  }
}

export async function addReview(req, res) {
  try {
    if (req.user == null) {
      return res.status(401).json({ message: "Please login to add a review" });
    }

    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    if (!comment || comment.trim() === "") {
      return res.status(400).json({ message: "Comment is required" });
    }

    const product = await Product.findOne({ productId: req.params.productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const alreadyReviewed = product.reviews.find(
      (review) => review.userEmail === req.user.email
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "You have already reviewed this product. Please edit your review.",
      });
    }

    product.reviews.push({
      userEmail: req.user.email,
      userName: `${req.user.firstName} ${req.user.lastName}`,
      rating: Number(rating),
      comment: comment.trim(),
    });

    updateProductRatingSummary(product);
    await product.save();

    res.status(201).json({ message: "Review added successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error: error.message });
  }
}

export async function updateReview(req, res) {
  try {
    if (req.user == null) {
      return res.status(401).json({ message: "Please login first" });
    }

    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    if (!comment || comment.trim() === "") {
      return res.status(400).json({ message: "Comment is required" });
    }

    const product = await Product.findOne({ productId: req.params.productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = product.reviews.id(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const isOwner = review.userEmail === req.user.email;
    const admin = isAdmin(req);

    if (!isOwner && !admin) {
      return res.status(403).json({ message: "You can edit only your own review" });
    }

    review.rating = Number(rating);
    review.comment = comment.trim();

    updateProductRatingSummary(product);
    await product.save();

    res.status(200).json({ message: "Review updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error: error.message });
  }
}

export async function deleteReview(req, res) {
  try {
    if (req.user == null) {
      return res.status(401).json({ message: "Please login first" });
    }

    const product = await Product.findOne({ productId: req.params.productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = product.reviews.id(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const isOwner = review.userEmail === req.user.email;
    const admin = isAdmin(req);

    if (!isOwner && !admin) {
      return res.status(403).json({ message: "You can delete only your own review" });
    }

    review.deleteOne();

    updateProductRatingSummary(product);
    await product.save();

    res.status(200).json({ message: "Review deleted successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error: error.message });
  }
}

export async function getAllReviewsForAdmin(req, res) {
  try {
    if (!isAdmin(req)) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const products = await Product.find();

    const allReviews = [];

    products.forEach((product) => {
      (product.reviews || []).forEach((review) => {
        allReviews.push({
          reviewId: review._id,
          productId: product.productId,
          productName: product.name,
          userEmail: review.userEmail,
          userName: review.userName,
          rating: review.rating,
          comment: review.comment,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
        });
      });
    });

    allReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json(allReviews);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching all product reviews",
      error: error.message,
    });
  }
}