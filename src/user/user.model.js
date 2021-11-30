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
    },
    favorites: [{
        type: String,
    }]
});

userSchema.methods.favorite = function(id){
    if(this.favorites.indexOf(id) === -1){
        this.favorites.push(id);
    }
    return this.save();
};

userSchema.methods.unfavorite = function(id){
    this.favorites.remove(id);
    return this.save();
};

userSchema.methods.isFavorite = function(id){
    return this.favorites
};

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, process.env.SECRET)
};

const User = mongoose.model("User", userSchema);
module.exports = User;
