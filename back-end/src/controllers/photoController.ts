import { Request, Response } from "express";
import { photoModel } from "../models/photoModel";
class photoController {
    async photos_all_get(req:Request,res:Response){
        const photos = await photoModel.find({}).select('-_id');
        res.json({photo:photos});
    }

    async photo_search(req:Request, res:Response){
        let photos = await photoModel.findOne({title:req.params.title}).select('-_id');
        if(!photos) return res.status(400).json({message:"no photo exists"});
        const{_doc}:any = photos; 
        res.status(200).json({..._doc})
    }

}
export default photoController;