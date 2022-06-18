const orderModel = require('../models/orderModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const ApiFeatures = require('../utils/apiFeatures');
const productModel = require('../models/productModel');

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


// GET A SINGLE ORDER
exports.getOrderDetails = catchAsyncError(async(req, res, next) => {
    // POPULATE WILL GO TO USER DATABASE AND BY CHECKING THE ID, IT WILL FETCH THE NAME AND EMAIL OF THE USER.
    const order = await orderModel.findById(req.params.id).populate("user", "name email");
    if(!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});

// GET LOGGED IN USER ORDERS
exports.getMyOrders = catchAsyncError(async(req, res, next) => {
    // POPULATE WILL GO TO USER DATABASE AND BY CHECKING THE ID, IT WILL FETCH THE NAME AND EMAIL OF THE USER.
    const orders = await orderModel.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders
    });
});


// GET ALL ORDERS ADMIN 
exports.getAllOrders = catchAsyncError(async(req, res, next) => {
    
    const orders = await orderModel.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount = totalAmount + order.totalPrice;
    })

    res.status(200).json({
        success: true,
        orders,
        totalAmount
    });
});

