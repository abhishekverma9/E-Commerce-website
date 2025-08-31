import express from 'express'
import authUser from '../middleware/auth.js'
import { loginUser,registerUser,adminLogin, googleLogin, googleCallback, getUser, setPassword, updateProfilepic } from '../controllers/userController.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get("/google/login", googleLogin)
userRouter.get("/google/callback", googleCallback)
userRouter.get('/profile',authUser,getUser)
userRouter.post('/set-password',authUser,setPassword)
userRouter.post('/update-profile-image',authUser,upload.single("image"),updateProfilepic)

export default userRouter;