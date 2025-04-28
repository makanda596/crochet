import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    // image:{
    //     default:"",
    //     type:String
    // },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Product = new mongoose.model("Product", ProductSchema)