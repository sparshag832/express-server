import * as authController from '../controllers/authController.js';
import express from 'express';
export const authRouter=express.Router();

authRouter.get('/login',(req,res)=>{
    res.render('login', { error: '', success: '' })
})
authRouter.post('/login',authController.login)

authRouter.post('/logout',authController.logout)