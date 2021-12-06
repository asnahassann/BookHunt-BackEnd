const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A username is required."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "An email address is required."],
    unique: true,
    match: /.+\@.+..+/,
  },
  password: {
    type: String,
    required: [true, "Please enter a confirmation password."],
  },
  favorites: [
    {
      type: String,
    },
  ],
  rating: [
    {
      score: {
        type: Number,
        default: 0,
      },
      id: {
          type: String,
          default: ""
      }
    },
  ],
});

userSchema.methods.favourite = function(id){
    if(this.favorites.indexOf(id) === -1){
        this.favorites.push(id);
    }
    return this.save();
};

userSchema.methods.unFavourite = function(id){
    this.favorites.remove(id);
    return this.save();
};

userSchema.methods.isFavourite = function(id){
    return this.favorites
};

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, process.env.SECRET)
};

const User = mongoose.model("User", userSchema);
module.exports = User;
