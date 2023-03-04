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
      res.status(200).json({token: token});
    } catch (err) {
      return res.json({ error });
    }
  }
  validateLoginUser(user: Request) {
    const schema = Joi.object({
      email: Joi.string().min(11).max(100).email().required(),
      password: Joi.string().min(8).required()
    });
    return schema.validate(user);
  }
  validateCreatedUser(user: Request) {
    const schema = Joi.object({
      first_name: Joi.string().min(3).max(50).required(),
      last_name: Joi.string().min(3).max(50).required(),
      username: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().min(11).max(100).email().required(),
      password: Joi.string().min(8).max(255).required()
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
 async user_photo_get(req: Request, res: Response) {
    let photoData = await userModel.findOne({username: req.params.username}).populate("photos","-_id").select("photos");
    console.log(photoData);
    if(!photoData) return res.status(401).json({message: "no photos for user"});
    const {_doc}: any = photoData;
    res.status(200).json({ ..._doc});
    
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
  /**
   * user_photo_delete: handles the deletion of  a particular user Photo
   */
  async user_photo_delete(req: Request, res: Response) {
    let {username, photoId} = req.params;
    let userData =  await userModel.updateOne({username}, {
      $pull :{'photos':{_id : photoId}}
    });
    let photoData = await photoModel.findByIdAndDelete(photoId);                                                                                                                         
    res.json({userData});
  }
  async userInfo(req: Request, res: Response) {
    let username = req.params.username;
    const user = await userModel.findOne({ username }).select(['-email','-password']).populate('photos');
    res.json({ message: user });
  }
  /**
   * getAllUsers - gets all the usernames and profile pics of everyone registered in the db. 
   */
   
  async getAllUsers(req:Request, res:Response)
  {
   try{ let userData = await userModel.find({}).select({username:1, About:{avatar:1}});
  }
  catch(err){
    res.status(400).json({message:"unable to find users"});
  }
    return;
  }
  async userInfo_update(req:Request, res:Response)
  {
    // the validation will be done on the client side
    if(!req.body) return;
  
    const embeddedProperties ={'About':['location', 'bio','IgUsername', "linkedinUsername","twitterUsername"]};
    const updatedObj ={};
    Object.keys(req.body).forEach((key)=>{
        
        if(embeddedProperties['About'].indexOf(key) !== -1)
        {
         updatedObj['About'].key = req.body[key];
        }
        updatedObj.key = req.body[key];
    });
    if(typeof req.file !== 'undefined'){
      updatedObj['About']['avatar'] = req.file?.filename;
    }
    const {username} = req.params;
    let updatedUser = await userModel.updateOne({username}, {$set:{
      updatedObj
    }});
    return;
  }
  async userDelete(req:Request, res:Response)
  {
    const {username} = req.params;
    let userId = await userModel.findOne({username}).select('id');
    let userPhotos = await photoModel.deleteMany({user:userId});
    let userProfile = await userModel.deleteOne({username});
    res.status(200).json({message:"Sucessfully deleted user account"})

    return;
  }
}

export default userController;
