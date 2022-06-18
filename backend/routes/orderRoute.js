const express = require('express');
const { newOrder, getOrderDetails, getMyOrders, getAllOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/orders/me").get(isAuthenticatedUser, getMyOrders);
router.route("/admin/orders").get(isAuthenticatedUser, authorizedRoles("admin"), getAllOrders);
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizedRoles("admin"), updateOrderStatus);
router.route("/admin/order/:id").delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOrder);

module.exports = router;