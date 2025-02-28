import express from 'express';
import { loginUser, regUser } from '../controllers/userController.js';
import { fileUploader } from '../controllers/fileUploader.js';
import upload from '../utils/multer.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', regUser);
userRouter.post('/upload', upload.single('file'), fileUploader)
export default userRouter;