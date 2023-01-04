import express from "express";
import passport from "passport";
import userController from "../controllers/userController";
const router = express.Router();
const user = new userController();
router.post("/",(req,res)=> user.getUser(req,res));
export default router;

