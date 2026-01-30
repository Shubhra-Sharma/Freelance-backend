import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from './routes/user.routes.js'
dotenv.config()
const app = express();
import connectDB from "./db/index.js";
mongoose.set('strictQuery',true);
connectDB();

app.use("/api/user", userRoute)
app.listen(8800, () => {
    console.log("server running")
})