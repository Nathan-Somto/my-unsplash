import express from "express";
import userController from "../controllers/userController";
const router = express.Router();
const user = new userController();
router.post("/",(req,res)=> user.createUser(req,res));
export default router;