import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import { setupSocket } from './config/socket';
import authRouter from './router/authRouter';
import './config/googleAuth'
import mongoose from 'mongoose';
import teamRouter from './router/teamRouter';
import fileRouter from './router/fileRouter';
import userRouter from './router/userRouter';

dotenv.config();

const app = express();
const server = http.createServer(app);
setupSocket(server);

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

//connect to mongodb
mongoose.connect(process.env.MONGO_URI as string)

app.use('/auth', authRouter)
app.use('/team', teamRouter)
app.use('/file', fileRouter)
app.use('/user', userRouter)

const PORT = process.env.PORT || 8000;


server.listen(PORT, () =>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})