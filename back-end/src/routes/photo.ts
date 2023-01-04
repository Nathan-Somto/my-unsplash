import { Router } from "express";
// imported controllers
import photoController from "../controllers/photoController";
// user object to access the userController class
const photo = new photoController();
const router = Router();

router.get('/', (req, res)=>photo.photos_all_get(req, res));

router.get('/:photoName',(req,res)=> photo.photo_search(req,res));

export default router;