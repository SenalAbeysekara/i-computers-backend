import express from 'express'
import mongoose from "mongoose"
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import authorizeUser from './lib/jwtMiddleware.js'
import cors from 'cors'
import dotenv from 'dotenv'
import orderRouter from './routers/orderRouter.js'

dotenv.config()


const mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI).then(
    ()=>{
        console.log("Connected to MongoDB")
    }
).catch(
    ()=>{
        console.log("Error connecting to MongoDB")
    }
)


const app = express()

app.use( cors() )

app.use( express.json() )

app.use(authorizeUser)





app.use("/api/users", userRouter)
app.use("/api/products", productRouter)
app.use("/api/orders", orderRouter)


app.listen(3000, ()=>{
    console.log("Server started on port 3000")
})