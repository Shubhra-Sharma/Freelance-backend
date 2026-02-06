import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
export const register = async (req,res,next) => {
  try{
    const hash = bcrypt.hashSync(req.body.password,10); // hashing password
    const newUser = new User({  // creating new User object to append to user database.
        ...req.body,
        password: hash
    });
    await newUser.save();
    res.status(201).send("User successfully created.");
  }catch(err){
    next(err);
  }
}

export const login = async (req,res, next) => {
    try{
     const user = await User.findOne({username: req.body.username});
     if(!user) return next(createError(404, "User not found."));

     const isCorrect = bcrypt.compareSync(req.body.password, user.password); 
     // comparing client side password and db password using bcrypt as the password is stored in hashed form.
     if(!isCorrect) return next(createError(401,"Incorrect username or password."))

     const token = jwt.sign({ // ACCESS TOKEN
        id: user._id,
        isSeller: user.isSeller,
     }, 
     process.env.JWT_SECRET
    );

    const {password, ...info} = user._doc; //
    const options = {
        httpOnly: true,
        secure: true,
    };
    res.cookie("accessToken", token, options).status(200).send(info); // sending access token in cookie.
    }catch(err){
        return next(err);
    }
}

export const logout = async (req,res,next) => {
  const options = {
    sameSite: "none",
    secure: true
  };
    res.clearCookie("accessToken", options).status(200).send("You are logged out.");
}