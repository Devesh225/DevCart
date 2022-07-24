const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // BUILT IN MODULE

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter user name"],
        maxLength: [50, "Name cannot exceed 50 characters."],
        minLength: [3, "Name should have at least 3 characters."]
    },
    email: {
        type: String,
        required: [true, "Please enter user email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email id."]
    },
    password: {
        type: String,
        required: [true, "Please enter user password"],
        minLengthL: [8, "Password should be at least 8 characters."],
        select: false, // WILL NOT GIVE THE PASSWORD WHEN FIND METHOD IS CALLED.
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

});

// BEFORE SAVING THE DOCUMENT IN THE COLLECTION :- pre(save) BEFORE SAVING

userSchema.pre("save", async function(next) {

    // IF PASSWORD IS MODIFIED, THEN ONLY WE WANT IT TO BE HASHED, BECAUSE IF IT IS NOT MODIFIED
    // IT IS ALREADY HASHED, SO IT WILL BE HASHED AGAIN, WHICH IS NOT OPTIMAL.
    if(!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10); // 10 is the SALTING POWER
});

// JWT TOKEN IMPLEMENTATION, GENERATE TOKEN AND STORE IN THE COOKIE.
// JWT_SECRET is the secret key which can be used to access the login of the user.
userSchema.methods.getJwtToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TOKEN_EXPIRE
    });
}

// COMPARE PASSWORD FUNCTION TO CHECK FOR PASSWORD
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

// PASSWORD RESET TOKEN GENERATION 
userSchema.methods.getPasswordResetToken = function() {
    // GENERATING TOKEN
    const passwordResetToken = crypto.randomBytes(20).toString('hex'); 

    // HASHING AND ADDING TO USERSCHEMA (resetPasswordToken)
    this.resetPasswordToken = crypto.createHash("sha256").update(passwordResetToken).digest("hex"); // STORED IN resetPasswordToken

    // CREATING EXPIRE TIME FOR TOKEN
    this.resetPasswordExpire = Date.now() + (10 * 60 * 1000) // INTO MILLISECONDS (10 MINUTES)

    return passwordResetToken;
}


const userModel = mongoose.model("User", userSchema);

module.exports = userModel;