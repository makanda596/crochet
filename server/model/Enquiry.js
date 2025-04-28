import mongoose from 'mongoose'

const EnquirySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
   
},{timestamps:true})

export const Enquiry = new mongoose.model('Enquiry', EnquirySchema)