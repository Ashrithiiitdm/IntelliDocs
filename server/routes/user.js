import express from 'express';
import { getFiles, getUser, regUser } from '../controllers/userController.js';
import { deleteFile, fileUploader, renameFile } from '../controllers/fileUploader.js';
import upload from '../utils/multer.js';
import { sharelink,updateDoc,viewDoc } from '../controllers/sharedocument.js';

const userRouter = express.Router();

userRouter.post('/register', regUser);
userRouter.post('/upload', upload.single('file'), fileUploader)
userRouter.get('/getuser', getUser)
userRouter.post('/:id/share',sharelink );
userRouter.get('/shared/:linkId', viewDoc);
userRouter.put('/shared/:linkId', updateDoc);
userRouter.get('/getuser', getUser)

userRouter.get('/:User_id/files', getFiles);
userRouter.put('/:User_id/files/:File_id', renameFile);
userRouter.delete('/:User_id/files/:File_id', deleteFile);
export default userRouter;