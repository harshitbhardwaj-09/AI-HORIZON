import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv';
import commentRouter from './controllers/comment.js';
import mongoose from 'mongoose';

dotenv.config({ path: './.env' });
const app=express()
const PORT = process.env.PORT || 8000;
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())




app.use('/comments', commentRouter);

export { app }