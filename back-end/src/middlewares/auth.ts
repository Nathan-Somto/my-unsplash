// import bycrpt
// import jwt
import jwt from "jsonwebtoken";
import {Request,Response, Router} from "express";
export default function auth (req:Request,res:Response,next: () => void){
    const token = req.header('x-auth-token');
    if(!token) return res.status(404).send("Invalid no token provided");
    try{
        const decoded = jwt.verify(token, "mySecretKey");
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(400).json({message:"Invalid token"});
    }
}


