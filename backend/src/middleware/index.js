const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/user.model")

exports.hashPassword = async (req,res,next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({ messages: "check server error logs" })
    }
}

exports.comparePasswords = async (req,res,next) => {
    try {
        const user = await User.findOne({ email: req.body.email }) 
        if (await bcrypt.compare(req.body.password, user.password)) {
            req.user = user 
            next();
    } else {
            throw new Error;
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "check server error logs" });
    }
}

exports.tokenAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const tokenObj = jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({ _id: tokenObj._id });
        req.user = user;
        if (!req.user) { 
            throw new Error();
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "check server logs" })
    }
} 