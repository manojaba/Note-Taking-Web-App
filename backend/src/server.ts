import 'dotenv/config'
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import validatedEnv from './utils/validateEnv';
import app from './app'

const port = validatedEnv.PORT;
const connection = validatedEnv.DATABASE_CONNECTION;







mongoose.connect(connection).then(() => {
    console.log('mongoose is connected');
    app.listen(port,() => {
        console.log('server running on port:',port)
    })
})
.catch(console.error)


