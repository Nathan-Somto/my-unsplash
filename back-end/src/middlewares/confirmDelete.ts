import bcrypt from "bcrypt";
import {Request,Response, Router} from "express";
import { userModel } from "../models/userModel";

export default async function deleteAuth (req:Request, res: Response ,next:()=> void){

const userData = await userModel.findOne({ username: req.params.username });
if(!userData) {
    return res.status(400).json({message: "confirmation failed, include a password before deletion"});
}
let valid = await bcrypt.compare(req.body.password, userData.password);
if (!valid) {
  return res.status(400).json({ message: "incorrect  password" });
}
next();
}