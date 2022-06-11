const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('./catchAsyncError');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser = catchAsyncError(async(req, res, next) => {
    const { token } = req.cookies; // DESTRUCTURING TOKEN FROM OBJECT

    if(!token) {
        return next(new ErrorHandler("Please Login to Access", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModel.findById(decodedData.id);

    next();
});

exports.authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) { // IF ROLES DOESN"T INCLUDE req.user.role THEN
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource.`, 403));
        }
        // ADMIN IS ALLOWED
        next();
    };
}