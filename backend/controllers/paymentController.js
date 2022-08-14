const catchAsyncError = require('../middlewares/catchAsyncError');
const Stripe = require("stripe")

const getStripeSecretKey = () => {
    return process.env.STRIPE_API_SECRET;
}

exports.processPayment = catchAsyncError(async(req, res, next) => {
    const stripe = new Stripe(getStripeSecretKey());
    const payment = await stripe.paymentIntents.create({
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