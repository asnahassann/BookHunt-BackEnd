const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, 
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+..+/,
    },
    password: {
        type: String, 
        required: true,
    }
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, process.env.SECRET)
};

const User = mongoose.model("User", userSchema);
module.exports = User;
