const express = require('express');
const { newOrder, getOrderDetails, getMyOrders } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/orders/me").get(isAuthenticatedUser, getMyOrders);

module.exports = router;