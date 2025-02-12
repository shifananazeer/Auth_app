import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken';

export const signup =async (req,res, next) => {
   const { username , email , password}  = req.body
   const hashedPassword = bcryptjs.hashSync(password , 10)
   const newUser = new User ({ username , email , password :hashedPassword})
   try{
    await  newUser.save()
  res.status(201).json({message:"User Created Succcessfully"})
   }catch(error) {
   next(error)
   }
  
}

export const signin = async (req,res ,next) => {
 const {email , password} = req.body;
 try {
   const validuser = await User.findOne({email})
   if(!validuser) return next(errorHandler(404 , "User Not Found"))
      const validPassword = bcryptjs.compareSync(password , validuser.password)
   if(!validPassword)return next(errorHandler(401 , "Invalied Cridentials"))
   
      const token = jwt.sign({id: validuser._id}, process.env.JWT_SECRET)
      const {password : hashedPassword , ...rest} = validuser._doc;
      const expairyDate = new Date(Date.now() + 3600000)
      res.cookie('access_token' ,token , {httpOnly :true , expires: expairyDate}).status(200).json(rest)

 }catch (error) {
   next(error)
 }
}



export const google = async (req, res , next) => {
   try{
      const user = await User.findOne({email:req.body.email})
      if(user) {
       const token = jwt.sign({id:user._id} , process.env.JWT_SECRET);
       const {password :hashedPassword, ...rest} = user._doc;
       const expairyDate = new Date(Date.now() + 3600000)
       res.cookie('access_token' , token , {
         httpOnly:true , expires: expairyDate 

       }).status(200).json(rest)
      }else{
       const generatedPassword = Math.random().toString(36).slice(-8);
       const hashedPassword = bcryptjs.hashSync(generatedPassword , 10);
       const newUser = new User ({
         username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(),
         email: req.body.email ,
         password : hashedPassword,
         profilePicture : req.body.photo
       })
       await newUser.save()
       const token = jwt.sign({id: newUser._id} , process.env.JWT_SECRET)
       const {password :hashedPassword2 , ...rest } = newUser._doc
       const expairyDate = new Date(Date.now() + 3600000)
       res.cookie('access_token' , token , {
         httpOnly:true,
         expires: expairyDate
       }).status(200).json(rest)
      }

   }catch (error) {
      next(error)
   }
}


export  const signout  = (req , res) => {
   res.clearCookie('access_token').status(200).json('Signout Success!')
}