import express from 'express';
import { loginUser, regUser } from '../controllers/userController.js';
import { fileUploader } from '../controllers/fileUploader.js';
import upload from '../utils/multer.js';
import { sharelink,updateDoc,viewDoc } from '../controllers/sharedocument.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);
userRouter.post('/register', regUser);
userRouter.post('/upload', upload.single('file'), fileUploader)
userRouter.post('/:id/share',sharelink );
userRouter.get('/shared/:linkId', viewDoc);
userRouter.put('/shared/:linkId', updateDoc);
export default userRouter;