const ErrorHandler = require("../utils/errorHandler");

const checkError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error.";


    // MongoDB CastError Handler
    if(err.name === 'CastError') {
        const message = `Resource not Found, Invalid: ${err.path}`
        err = new ErrorHandler(message, 500);
    }

    // MongoDB Duplicate Key Error
    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered `;
        err = new ErrorHandler(message, 500);
    }

    // Duplicate JWT Error
    if(err.name === 'JsonWebTokenError') {
        const message = `Token is Invalid, Try Again Later.`;
        err = new ErrorHandler(message, 500);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}


module.exports = checkError;