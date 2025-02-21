import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import userRouter from './routes/user.js';


dotenv.config();
const app = express();

const port = process.env.PORT || 8000;
connectDB();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to IntelliDocs');
});

app.use('/api/auth', userRouter);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});