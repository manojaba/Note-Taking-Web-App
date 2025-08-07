import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import noteRoutes from './routes/notes.routes'
import createHttpError  from 'http-errors';
import {isHttpError} from 'http-errors';
import userRoutes from './routes/user.route';
import session from 'express-session';
import env from './utils/validateEnv';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import { requiresAuth } from './middleware/auth';

 const app = express();
 app.use(cors({
   origin:'http://localhost:5174',
   credentials:true,
 }));
 app.use(express.json());

//  app.get('/test-cors',(req:Request,res:Response) => {
//    res.status(200).json({message:'CORS is working directly here!'});
//  })


 app.use(morgan('dev'));
 app.use(session({
   secret:env.SESSION_SECRET,
   resave:false,
   saveUninitialized:false,
   cookie:{
      maxAge: 60* 60 * 1000,
      sameSite:'lax',
      secure:false,
   },
   rolling:true,
   store:MongoStore.create({
      mongoUrl:env.DATABASE_CONNECTION
   }),
 }))

 app.use('/api/notes',noteRoutes);
 app.use('/api/user',userRoutes);


 app.use((req,res,next) => {
    next(createHttpError(404,'Endpoint not found'));
 })

 app.use((error:unknown,req:Request, res:Response,next:NextFunction)  => {
    console.error('Caught the Error:',error);
    let errorMessage = 'Unknown Error';
    let statusCode = 500;
    if(isHttpError(error)){
        errorMessage = error.message;
        statusCode = error.status;
    }
    res.status(statusCode).json({theErrorIs:errorMessage});
 })


 export default app;