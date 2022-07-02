const productModel = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const ApiFeatures = require('../utils/apiFeatures');


// GET ALL PRODUCTS
exports.getAllProducts = catchAsyncError(async(req, res) => {
    const resultPerPage = 9;
    const productCount = await productModel.countDocuments();

    const apiFeatures = new ApiFeatures(productModel.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        products,
        productCount
    });
});


// CREATE A PRODUCT
exports.createProduct = catchAsyncError(async(req, res) => {
    req.body.user = req.user.id;
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

// CREATE/UPDATE A REVIEW
exports.createUpdateProductReview = catchAsyncError(async(req, res, next) => {
   
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user.id,
        name: req.user.name,
        profilePicture: req.user.avatar.url,
        rating: Number(rating),
        comment: comment,
    }

    const product = await productModel.findById(productId);
    
    // IF THE ID INSIDE THE USER IS THE SAME AS THE CURRENT ID LOGGED IN, THEN REVIEW IS ALREADY DONE
    const isReviewed = product.reviews.find(review => review.user.toString() === req.user.id);

    if(isReviewed) {
        product.reviews.forEach((review) => {
            if(review.user.toString() === req.user.id) {
                review.rating = rating,
                review.comment = comment
            }
        })
    } else {
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length
    }

    let sumRating = 0;
    product.reviews.forEach((review) => {
        sumRating += review.rating
    });

    product.rating = sumRating/product.reviews.length;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        product
    });

});

// GET ALL REVIEWS OF A SINGLE PRODUCT
exports.getAllReviewsProduct = catchAsyncError(async(req, res, next) => {
    const product = await productModel.findById(req.query.id);
    if(!product) {
        return next(new ErrorHandler('Product Not Found', 400));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

// DELETE A REVIEW
exports.deleteReview = catchAsyncError(async(req, res, next) => {

    const product = await productModel.findById(req.query.productId);
    if(!product) {
        return next(new ErrorHandler('Product Not Found', 400));
    }

    const reviews = product.reviews.filter((review) => {
        return review._id.toString() !== req.query.reviewId.toString();
    });

    let sumRating = 0;
    reviews.forEach((review) => {
        sumRating += review.rating
    });

    const rating = sumRating/reviews.length;
    const numberOfReviews = reviews.length;

    await productModel.findByIdAndUpdate(req.query.productId, {
        reviews: reviews,
        rating: rating,
        numberOfReviews: numberOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: 'Review Deleted Successfully'
    });
});