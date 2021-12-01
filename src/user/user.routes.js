const { Router } = require("express");
const { addUser, logIn, listFavBook  } = require("./user.controllers");
const { hashPassword, comparePasswords, tokenAuth } = require("../middleware/index");
const userRouter = Router(); 

userRouter.post("/user", hashPassword, addUser); 

userRouter.post("/login", comparePasswords, logIn);

userRouter.get("/token", tokenAuth, logIn);

userRouter.put("/profile", tokenAuth, listFavBook);

module.exports = userRouter; 

