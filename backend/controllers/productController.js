const productModel = require('../models/productModel');


// GET ALL PRODUCTS
exports.getAllProducts = async(req, res) => {
    const products = await productModel.find();
    res.status(200).json({
        success: true,
        products
    });
}


// CREATE A PRODUCT
exports.createProduct = async(req, res) => {
    const product = await productModel.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
}

// UPDATE PRODUCT
exports.updateProduct = async(req, res) => {
    let product = await productModel.findById(req.params.id);
    if(!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found."
        });
    }
    
    product = await productModel.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true});
    res.status(200).json({
        success: true,
        product
    });
}

// DELETE PRODUCT
exports.deleteProduct = async(req, res) => {
    const product = await productModel.findById(req.params.id);
    if(!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found."
        });
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully."
    });
}

// GET A SINGLE PRODUCT / PRODUCT DETAILS
exports.getProduct = async(req, res) => {
    const product = await productModel.findById(req.params.id);
    if(!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found."
        });
    }

    res.status(200).json({
        success: true,
        product
    });

}

