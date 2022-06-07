const productModel = require('../models/productModel');


// CREATE A PRODUCT
exports.createProduct = async(req, res) => {
    const product = await productModel.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
}


// GET ALL PRODUCTS
exports.getAllProducts = (req, res) => {
    res.status(200).json({message: "Route is working fine."});
}