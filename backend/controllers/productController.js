const productModel = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');


// GET ALL PRODUCTS
exports.getAllProducts = catchAsyncError(async(req, res) => {
    const products = await productModel.find();
    res.status(200).json({
        success: true,
        products
    });
});


// CREATE A PRODUCT
exports.createProduct = catchAsyncError(async(req, res) => {
    const product = await productModel.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});

// UPDATE PRODUCT
exports.updateProduct = catchAsyncError(async(req, res, next) => {
    let product = await productModel.findById(req.params.id);
    if(!product) {
        return next(new ErrorHandler("Product Not Found.", 500));
    }
    
    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true});
    res.status(200).json({
        success: true,
        product
    });
});

// DELETE PRODUCT
exports.deleteProduct = catchAsyncError(async(req, res) => {
    const product = await productModel.findById(req.params.id);
    if(!product) {
        return next(new ErrorHandler("Product Not Found.", 500));
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully."
    });
});

// GET A SINGLE PRODUCT / PRODUCT DETAILS
exports.getProduct = catchAsyncError(async(req, res) => {
    const product = await productModel.findById(req.params.id);
    if(!product) {
        return next(new ErrorHandler("Product Not Found.", 500));
    }

    res.status(200).json({
        success: true,
        product
    });

});

