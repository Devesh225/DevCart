const mongoose = require('mongoose');
const validator = require('validator');

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
    resetPasswordToken: String,
    resetPasswordExpire: Date,

});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;