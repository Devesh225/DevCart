const orderModel = require('../models/orderModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const ApiFeatures = require('../utils/apiFeatures');

// CREATE NEW ORDER
exports.newOrder = catchAsyncError(async(req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, orderPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    const order = orderModel.create({
        shippingInfo: shippingInfo, 
        orderItems: orderItems, 
        paymentInfo: paymentInfo, 
        orderPrice: orderPrice, 
        taxPrice: taxPrice, 
        shippingPrice: shippingPrice, 
        totalPrice: totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(200).json({
        success: true,
        order
    });
});