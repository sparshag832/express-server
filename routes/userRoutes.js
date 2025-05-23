import * as userController from '../controllers/userController.js'
import express from 'express'


export const userRouter = express.Router();

userRouter.get('/create',(req,res)=>{
    res.render('register', { error: '', success: '' })
})
userRouter.post('/create',userController.createUser)
userRouter.get('/get/:id',userController.getUser)
userRouter.get('/all',userController.getAllUsers)
userRouter.delete('/delete/:id',userController.deleteUser)
userRouter.patch('/update/:id',userController.updateUser)
