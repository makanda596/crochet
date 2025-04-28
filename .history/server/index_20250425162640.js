import express from "express"
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import session from 'express-session'
import adminRoutes from './routes/adminRoutes.js'


dotenv.config()
//middleware
const URL = process.env.FRONTEND_URL

app.use(cors(
    {
        origin: URL,
        credentials: true,
    }
))
//for files limit 
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser())


//routes

app.use('/admin', adminRoutes)

const PORT = process.env.PORT || 6000;
const MONGO_URL= process.env.MONGO_URL
//mongo db connect
mongoose.connect(MONGO_URL) 
try {
    console.log("mongodb conneted")
}
catch (error) {
    console.error(error)
}
app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`)
})