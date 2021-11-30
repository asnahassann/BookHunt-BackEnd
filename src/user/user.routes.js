const { Router } = require("express");
const { addUser, logIn } = require("./user.controllers");
const { hashPassword, comparePasswords, tokenAuth } = require("../middleware/index");
const userRouter = Router(); 

userRouter.post("/user", hashPassword, addUser); 

userRouter.post("/login", comparePasswords, logIn);

userRouter.get("/token", tokenAuth,  logIn);

module.exports = userRouter; 

