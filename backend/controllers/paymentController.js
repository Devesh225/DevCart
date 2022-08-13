const catchAsyncError = require('../middlewares/catchAsyncError');
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

exports.processPayment = catchAsyncError(async(req, res, next) => {
    const payment = stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
            company: "DevCart"
        }
    })
    res.status(200).json({
        success: true,
        client_secret: payment.client_secret
    })
})

exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});