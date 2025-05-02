import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    image: {
        type: String,
        default: ""
    },
    optionalImage1: {
        type: String,
        default: ""
    },
    optionalImage2: {
        type: String,
        default: ""
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const Product = mongoose.model("Product", ProductSchema);
