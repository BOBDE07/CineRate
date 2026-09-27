import express from 'express' ; 
import { userDetail, userLogin, userRegister } from '../controllers/user.controller.js';
import userAuth from '../middlewares/user.middleware.js';

const userRouter = express.Router() ; 

userRouter.post('/register' , userRegister) ; 
userRouter.post('/login' , userLogin) ; 
userRouter.get("/detail", userAuth , userDetail);

export default userRouter