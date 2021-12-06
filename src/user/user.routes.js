const { Router } = require("express");
const { addUser, logIn, updateUser, deleteUser, listFavBook, favouriteBook, unfavouriteBook, reviewStar  } = require("./user.controllers");
const { hashPassword, comparePasswords, tokenAuth } = require("../middleware/index");
const userRouter = Router(); 

userRouter.post("/user", hashPassword, addUser); 

userRouter.post("/login", comparePasswords, logIn);

userRouter.patch('/user', tokenAuth, updateUser);

userRouter.delete('/user', tokenAuth, deleteUser);

userRouter.get("/token", tokenAuth, logIn);

userRouter.get("/profile", tokenAuth, listFavBook);

userRouter.put("/favourite", tokenAuth, favouriteBook);

userRouter.put("/unfavourite", tokenAuth, unfavouriteBook);

userRouter.put("/review", tokenAuth, reviewStar);

module.exports = userRouter; 

