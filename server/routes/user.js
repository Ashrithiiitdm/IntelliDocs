import express from 'express';
import { loginUser, regUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', regUser);
export default userRouter;