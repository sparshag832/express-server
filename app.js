import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import { userRouter } from './routes/userRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import dotenv from 'dotenv';
import { createUserTable } from './models/userModel.js';

dotenv.config({ path: './.env' });

const app=express();
app.use(express.json());  // JSON Data via framework
app.use(express.urlencoded({ extended: true }));  // form-data via ejs || axios || fetch
app.set('view engine','ejs')

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname,"public")))

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: "Too many requests from this IP, please try again later",
    standardHeaders: true, 
    legacyHeaders: false, 
  });

app.use(limiter)

createUserTable();

app.use('/user',userRouter)
app.use('/auth',authRouter)

app.get('/',(req,res)=>{
res.render("index")
})

const port=process.env.port || 3000
app.listen(port,()=>{
    console.log("App Is Running on Port",port)
})