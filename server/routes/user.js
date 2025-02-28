import express from 'express';
import { getFiles, loginUser, regUser } from '../controllers/userController.js';
import { deleteFile, fileUploader, renameFile } from '../controllers/fileUploader.js';
import upload from '../utils/multer.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', regUser);
userRouter.post('/upload', upload.single('file'), fileUploader)

userRouter.get('/:User_id/files', getFiles);
userRouter.put('/:User_id/files/:File_id', renameFile);
userRouter.delete('/:User_id/files/:File_id', deleteFile);
export default userRouter;