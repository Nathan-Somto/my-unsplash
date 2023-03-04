import path from 'path';
import dotenv from "dotenv";
dotenv.config({path: path.join(__dirname,'/.env')})
import mongoose from "mongoose";
import express from "express";
import passport from "passport";
import cors from "cors";
import userRouter from './src/routes/user';
import photoRouter from './src/routes/photo';
import signUp from './src/routes/signUp';
import logIn from './src/routes/loginIn';
const app = express();
const PORT = process.env.PORT || 8000;

 mongoose.connect(
process.env.MONGO_DB_URL as string,()=> console.log('connected...'));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

// routes
app.use("/api/signUp",signUp);
app.use("/api/login",logIn);
app.use("/api/user",userRouter);
app.use("/api/photos",photoRouter);

// catch all invalid route 
app.use((req,res)=>{
    res.status(404).send("Invalid route");
})

app.listen(PORT,()=>{
    console.log("listening to requests");
})