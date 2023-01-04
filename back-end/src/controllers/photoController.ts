import { Request, Response } from "express";
import Joi from "joi";
import { photoModel } from "../models/photoModel";
class photoController {
    async photos_all_get(req:Request,res:Response){
        const photos = await photoModel.find({}).select('-_id');
        res.json({photo:photos});
    }

    photo_search(req:Request, res:Response){
        res.json({message:"search for a particular image"})
    }

}
export default photoController;