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

// UPDATE ORDER STATUS ADMIN 
exports.updateOrderStatus = catchAsyncError(async(req, res, next) => {
    
    const order = await orderModel.find(req.params.id);

    if(order.orderStatus === 'Delivered') {
        return next(new ErrorHandler("This order is already delivered", 400));
    }

    // WE NEED TO SUBTRACT THE QUANTITY FROM THE STOCK WHEN THE ITEM GETS DELIVERED.
    order.orderItems.forEach(async(order) => {
        await updateStock(order.product, order.quantity);
    });

    order.orderStatus = req.body.status;
    
    if(req.body.status === 'Delivered') {
        order.deliveredAt = Date.now()
    }

    await order.save({
        validateBeforeSave: false
    });

    res.status(200).json({
        success: true,
        orders,
        totalAmount
    });
});

async function updateStock(productId, quantity) {
    const product = await productModel.findById(productId);
    product.stock = product.stock - quantity;
    await product.save({
        validateBeforeSave: false
    });
}

// DELETE ORDER 
exports.deleteOrder = catchAsyncError(async(req, res, next) => {
    
    const order = await orderModel.find(req.params.id);

    if(!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    await order.remove()

    res.status(200).json({
        success: true,
        message: "Order Deleted Successfully"
    });
});


