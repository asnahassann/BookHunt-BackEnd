const { Router } = require("express");
const { addUser, logIn, updateUser, deleteUser, listFavBook, favouriteBook, unfavouriteBook  } = require("./user.controllers");
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

module.exports = userRouter; 

