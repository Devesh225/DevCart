const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProduct, createUpdateProductReview } = require('../controllers/productController');
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/product/new").post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);
router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct)
    
router.route("/product/:id").get(getProduct);

router.route("/review").put(isAuthenticatedUser, createUpdateProductReview);

module.exports = router;