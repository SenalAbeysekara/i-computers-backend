import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import AuthorizeUser from './lib/jwtMiddleware.js';
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI)
.then(
    () =>{
        console.log('MongoDB Connected Successfully')
    }
)
.catch(
    () =>{
        console.log('MongoDB Connection Failed: ')
    }
)
 
const app = express();

app.use(cors())

//middleware to parse json data from request body
app.use(express.json());

//Authentiation Middleware lib FIle eka balanna
app.use(AuthorizeUser)

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

//arrow function witout using separate function to start server since we dont use again and again
app.listen(3000, 
    () => {console.log('Server is Running On Port 3000')}
);

