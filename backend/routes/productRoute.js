const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProduct, createUpdateProductReview, getAllReviewsProduct, deleteReview } = require('../controllers/productController');
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/product/new").post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);
router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct)
    
router.route("/product/:id").get(getProduct);

router.route("/review").put(isAuthenticatedUser, createUpdateProductReview);

router.route("/reviews").get(getAllReviewsProduct).delete(isAuthenticatedUser, deleteReview);

module.exports = router;