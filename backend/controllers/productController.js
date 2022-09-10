const productModel = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const ApiFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');

// GET ALL PRODUCTS
exports.getAllProducts = catchAsyncError(async(req, res) => {
    const resultPerPage = 9;
    const productCount = await productModel.countDocuments();
    const apiFeatures = new ApiFeatures(productModel.find(), req.query).search().filter();

    let filteredProducts = await apiFeatures.query.clone;
    let filteredProductsCount = filteredProducts.length;

    apiFeatures.pagination(resultPerPage);
    let products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        products,
        productCount,
        filteredProductsCount,
        resultPerPage
    });
});


// CREATE A PRODUCT
exports.createProduct = catchAsyncError(async(req, res) => {

    let images = [];
    if(typeof req.body.images === "string") { // ONLY ONE IMAGE
        images.push(req.body.images);
    } else { // MULTIPLE IMAGES, SO ARRAY
        images = req.body.images;
    }

    const imagesLink = [];

    for(let i = 0; i < (images?.length > 0); i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], { folder: "products" });
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url
        });
    }

    req.body.images = imagesLink;
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

    let images = [];
    if(typeof req.body.images === "string") { // ONLY ONE IMAGE
        images.push(req.body.images);
    } else { // MULTIPLE IMAGES, SO ARRAY
        images = req.body.images;
    }

    if(images !== undefined) {
        // DELETE OLD IMAGES
        for(let i = 0; i < product.images.length; i++) {
            let image = product.images[i];
            await cloudinary.v2.uploader.destroy(image.public_id);
        }
        // UPLOAD NEW IMAGES
        const imagesLink = [];

        for(let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(image[i], { folder: "products" });
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        }

        req.body.images = imagesLink;
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
    // DELETE IMAGES FROM CLOUDINARY
    for(let i = 0; i < product.images.length; i++) {
        let image = product.images[i];
        await cloudinary.v2.uploader.destroy(image.public_id);
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

    const rating = reviews.length > 0 ? sumRating/reviews.length : 0;
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

exports.getAllProductsAdmin = catchAsyncError(async(req, res) => {
    const products = await productModel.find();
    res.status(200).json({
        success: true,
        products,
    });
});
