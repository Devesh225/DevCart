const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const userModel = require('../models/userModel');
const sendToken = require('../utils/jwtToken');


// REGISTER A USER FUNCTION
exports.registerUser = catchAsyncError(async(req, res, next) => {
    const {name, email, password} = req.body;
    const user = await userModel.create({
        name, 
        email, 
        password,
        avatar: {
            public_id: "This is a Sample Public ID",
            url: "This is a Sample URL",
        }
    });

    sendToken(user, 201, res);

});


// LOGIN USER FUNCTION
exports.loginUser = catchAsyncError(async(req, res, next) => {
    const {email, password} = req.body;
    // EMAIL AND PASSWORD CHECKING
    if(!email || !password) {
        return next(new ErrorHandler("Please Enter Your Credentials.", 400));
    }

    const user = await userModel.findOne({email}).select("+password"); // BECAUSE SELECT FALSE WAS GIVEN IN PASSWORD.

    if(!user) {
        return next(new ErrorHandler("Invalid Credentials", 400));
    }

    // MATCHING PASSWORD
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Credentials", 401));
    }

    const token = user.getJwtToken();

    sendToken(user, 200, res);

});

exports.logoutUser = catchAsyncError(async(req, res, next) => {
    
    res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    
    res.status(200).json({
        success: true,
        message: "Logged Out Successfully."
    });
});