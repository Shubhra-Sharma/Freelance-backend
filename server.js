import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from './routes/user.routes.js';
import authRoute from './routes/auth.route.js';
import cookieParser from "cookie-parser";
dotenv.config()
const app = express();
import connectDB from "./db/index.js";
mongoose.set('strictQuery',true);
connectDB();
app.use(express.json()); // middleware, to send json response from client side
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.use((err,req,res,next) => {
 const errorState = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorState).send(errorMessage);
})
app.listen(8800, () => {
    console.log("server running")
})