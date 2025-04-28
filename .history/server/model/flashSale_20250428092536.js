import mongoose from 'mongoose'

const FlashSaleSchema = new mongoose.Schema({
    image:{
        default:"",
        type:String
    },
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
    },
     oldprice: {
        type: String,
        required: true
    }
},{timestamps:true})

export const FlashSale = new mongoose.model("FlashSale", FlashSaleSchema)