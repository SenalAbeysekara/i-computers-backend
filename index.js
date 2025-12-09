import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import AuthorizeUser from './lib/jwtMiddleware.js';

const mongoURI = 'mongodb+srv://admin:123@production.i1iwmsc.mongodb.net/?appName=Production'

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

//middleware to parse json data from request body
app.use(express.json());

app.use(AuthorizeUser)

app.use('/users', userRouter);
app.use('/products', productRouter);

//arrow function witout using separate function to start server since we dont use again and again
app.listen(3000, 
    () => {console.log('Server is Running On Port 3000')}
);
