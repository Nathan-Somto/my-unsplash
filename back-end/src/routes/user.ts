    // imported dependency
import { Router } from "express";
// imported controllers
import userController from "../controllers/userController";
import auth from '../middlewares/auth';
import confirmDelete from "../middlewares/confirmDelete";
// user object to access the userController class
const user = new userController();
const router = Router();
// route handlers for a specific user
// methods are used in arrow functions to bind this
router.get('/me', auth,(req,res)=>{
    if(req.user){
    const {_id, username}:any = req.user;
    res.json({_id, username});
    }
})
router.get('/photo/:username',auth,(req,res)=>user.user_photo_get(req,res));
router.get('/:username',auth,(req,res)=>user.userInfo(req,res));

// route handlers for user photos 
router.post('/photo/:username',auth,(req,res)=>user.user_photo_post(req,res));
router.use('/photo/:username/:photoId',confirmDelete);
router.delete('/photo/:username/:photoId',auth,(req,res)=> user.user_photo_delete(req,res));

export default router;
