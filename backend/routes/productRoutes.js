import express from "express";
import { getProductById, getProducts,createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts } from "../controllers/productController.js";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/top').get(getTopProducts)
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct)
router.route('/:id/reviews').post(protect, admin, createProductReview)
export default router;