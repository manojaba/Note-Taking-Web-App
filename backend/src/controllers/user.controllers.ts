import { RequestHandler } from "express";
import createHttpError from "http-errors";
import userModel from '../models/user.model';
import bcrypt from 'bcrypt';

interface SignupBody {
  
    email?:string;
    password?:string;
}

export const getAuthenticatedUser:RequestHandler = async (req,res,next) => {
    

    try{
        
        const user = await userModel.findById(req.session.userId).select("+email").exec();
        res.status(200).json(user);

    }catch(error){
        next(error)
    }
}

export const signup:RequestHandler<unknown,unknown,SignupBody,unknown> = async (req,res,next) => {

const email = req.body.email;
const passwordRaw = req.body.password;
try{
    if( !email || !passwordRaw){
        throw createHttpError(400,'parameters missing');
    }


    const existingEmail = await userModel.findOne({email:email});

    if(existingEmail){
        throw createHttpError(409,'email address already exist');
    }

    const passwordHashed = await bcrypt.hash(passwordRaw,10);

    const newUser = await userModel.create({
       
        email:email,
        password:passwordHashed,
    })

    req.session.userId = newUser._id;

    res.status(200).json(newUser);




}catch(error){
    next(error)
}
}

interface LoginBody {
    email?:string;
    password?:string;
}

export const login:RequestHandler<unknown,unknown,LoginBody,unknown> = async (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password
   try{
     if(!email || !password){
        throw createHttpError(400,'Parameters missing')
    }
    const user = await userModel.findOne({email:email}).select("+email + password").exec();
    if(!user){
       throw createHttpError(401, "Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password,user.password);

    if(!passwordMatch){
        throw createHttpError(401,"Invalid credentials")
    }
    req.session.userId = user._id;
    res.status(201).json(user);

   }catch(error){
    next(error)
   }
}

export const logout:RequestHandler = (req,res,next) => {
    req.session.destroy(error => {
        if(error){
            next(error)
        } else {
            res.sendStatus(200);
        }
    });
}

interface ChangePasswordBody{
    oldPassword?:string;
    newPassword?:string;
}

export const changepassword: RequestHandler<unknown, unknown, ChangePasswordBody, unknown> = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  try {
    if (!oldPassword || !newPassword) {
      throw createHttpError(400, "Old and new passwords are required");
    }

    const userId = req.session.userId;

    if (!userId) {
      throw createHttpError(401, "Not authenticated");
    }

    const user = await userModel.findById(userId).select("+password").exec();

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      throw createHttpError(403, "Old password is incorrect");
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    next(error);
  }
};