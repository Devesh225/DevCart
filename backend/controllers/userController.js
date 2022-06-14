const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const userModel = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require(`../utils/sendEmail`);
const crypto = require('crypto');

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

// LOGOUT USER
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

// FORGOT PASSWORD FOR USER
exports.forgotPassword = catchAsyncError(async(req, res, next) => {
    const user = await userModel.findOne( {email: req.body.email} );
    if(!user) {
        return next(new ErrorHandler("User not Found", 404));
    }

    const passwordResetToken = user.getPasswordResetToken();

    // TOKEN HAS BEEN CREATED BUT NOT SAVED, SO WE SAVE THE DOCUMENT.
    await user.save({ validateBeforeSave: false });

    // CREATING PASSWORD RESET URL (http/https -> req.protocol, localhost, or production host -> req.get("host"))
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/password/reset/${passwordResetToken}`;

    // MESSAGE FOR EMAIL
    const message = `Your Password Reset Token is :- \n\n ${resetPasswordUrl} \n\n if you have not reqested for this email, then please ignore.`

    try {
        await sendEmail({
            email: user.email,
            subject: `DevCart Password Recovery`,
            message: message
        });

        res.status(200).json({
            success: true,
            message: `Email Sent to ${user.email} successfully!`
        })
    } catch (error) {
        // SINCE WE HAVE SAVED THE TOKEN, AND THE EXPIRE, WE NEED TO MAKE THEM UNDEFINED.
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        // TOKEN HAS BEEN MADE UNDEFINED BUT NOT SAVED, SO WE SAVE THE DOCUMENT.
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(`Error: ${error.message}`, 500));
    }
});

// RESET PASSWORD
exports.resetPassword = catchAsyncError(async(req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex"); 
    const user = await userModel.findOne({resetPasswordToken, resetPasswordExpire: { $gt: Date.now() }});
    
    if(!user) {
        return next(new ErrorHandler("Reset Password Token is Invalid, or has been Expired", 400));
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

// GET USER DETAILS 
exports.getUserDetails = catchAsyncError(async(req, res, next) => {
    // THIS CAN ONLY BE ACCESSED BY SOMEONE WHO HAS ALREADY LOGGED IN, SO WE TAKE THE USER ID FROM THE REQ, AND WE FIND THE USER.
    // IT IS IMPOSSIBLE THAT USER CANNOT BE FOUND BECAUSE THAT IS THE USER WHICH IS LOGGED IN.
    // THE USER IS STORED IN req.user AFTER LOGGING IN.
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    });
});