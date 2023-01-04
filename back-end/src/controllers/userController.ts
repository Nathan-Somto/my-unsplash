import mongoose from "mongoose";
import { Request, Response } from "express";
import { userModel, generateAuthToken } from "../models/userModel";
import { IVerifyOptions, VerifyFunctionWithRequest } from "passport-local";
import Joi from "joi";
import bcrypt from "bcrypt";
import { photoModel } from "../models/photoModel";
class userController {
  async getUser(req: Request, res: Response): Promise<any> {
    const { error } = this.validateLoginUser(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const { email, password } = req.body;
    try {
      const userData = await userModel.findOne({ email });
      if (!userData)
        return res.status(400).json({ message: "incorrect email or password" });
      let valid = await bcrypt.compare(password, userData.password);
      if (!valid) {
        return res.status(400).json({ message: "incorrect email or password" });
      }
      const token = generateAuthToken({
        id: userData._id as any,
        username: userData.username,
        email: userData.email,
      });
      res.status(200).json(token);
    } catch (err) {
      return res.json({ error });
    }
  }
  validateLoginUser(user: Request) {
    const schema = Joi.object({
      email: Joi.string().min(11).max(100).email().required(),
      password: Joi.string().min(8).required(),
      repeat_password: Joi.ref("password"),
    });
    return schema.validate(user);
  }
  validateCreatedUser(user: Request) {
    const schema = Joi.object({
      first_name: Joi.string().min(3).max(50).required(),
      last_name: Joi.string().min(3).max(50).required(),
      username: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().min(11).max(100).email().required(),
      password: Joi.string().min(8).max(255).required(),
      repeat_password: Joi.ref("password"),
    });
    return schema.validate(user);
  }
  async createUser(req: Request, res: Response): Promise<any> {
    const { error } = this.validateCreatedUser(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message }) as any;
    const { username, first_name, last_name, email } = req.body;
    let user = await userModel.findOne({ email });
    if (user)
      return res.status(400).json({ message: "user already exists" }) as any;
    let hash = await bcrypt.hash(req.body.password, 10);

    try {
      const userData = await userModel.create({
        first_name,
        last_name,
        username,
        email,
        password: hash,
      });
      const token = generateAuthToken({
        id: userData._id as any,
        username: userData.username,
        email: userData.email,
      });

      res.header('x-auth-token',token).json({
        _id: userData._id,
        username: userData.username,
        token: token,
      });
    } catch (err) {
      res.json({ err });
    }
  }
  user_photo_get(req: Request, res: Response) {
    res.json({ message: "gets all the photo for a specified user" });
  }
  async user_photo_post(req: Request, res: Response) {
    if(!req.body) res.status(401).json({message:"no data provided"});
    let photoData = await photoModel.create({
      title:req.body.title,
      caption: req.body.caption,
      url:req.body.url
    });
    console.log(photoData);
    let userData = await userModel.findOneAndUpdate({username:req.params.username},{
      $push: {photos: photoData._id}
    },{new: true});
    console.log(userData);
  let updatedPhoto = await photoModel.findByIdAndUpdate(photoData._id,{
      $set:{
        user:userData?._id
      }
    });
    console.log(updatedPhoto);
    const {_doc}: any = updatedPhoto;
    res.json({ ..._doc});
  }
  user_photo_delete(req: Request, res: Response) {
    res.json({message: "deletes a user photo" });
  }
  async userInfo(req: Request, res: Response) {
    let username = req.params.username;
    const user = await userModel.findOne({ username });
    res.json({ message: user });
  }
}
export default userController;
