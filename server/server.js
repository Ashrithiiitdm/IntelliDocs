import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import userRouter from './routes/user.js';



dotenv.config();
const app = express();

app.use(express.json());  // Place after multer
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8000;
connectDB();
app.use(cors());


app.get('/', (req, res) => {
    res.send('Welcome to IntelliDocs');
});

app.use('/api/auth', userRouter);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});