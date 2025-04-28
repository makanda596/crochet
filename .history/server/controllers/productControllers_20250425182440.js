import { FlashSale } from '../model/flashSale.js';
import { Product } from '../model/productsmodel.js';
import cloudinary from '../utilis/cloudinary.js';


export const createProduct = async (req, res) => {
    const { title, description, price, image } = req.body;

    try {
        if (!title || !description || !price) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const existingAdmin = await Admin.findById(req.admin.id);
        if (!existingAdmin) {
            return res.status(404).json({ success: false, message: "admin not found" });
        }

        if (!image) {
            return res.status(400).json({ error: "No image provided." });
        }

        const uploadResponse = await cloudinary.uploader.upload(image);
        const post = new Post({
            title,
            description,
           price,
            image: uploadResponse.secure_url,
        });

        const savedPost = await post.save();

        res.status(201).json({
            message: "Post created successfully!",
            post: savedPost
        });
    } catch (error) {
        console.error("❌ Post Creation Error:", error);
        res.status(500).json({
            error: "Internal server error",
            message: error.message
        });
    }
};

export const getAllproducts = async (req, res) => {
try{
        const products = await Product.find({})
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error.message });
    }}


export const getOneproduct = async (req, res) => {
    const { productId } = req.params

    try {

        const product = await Product.findOne({ _id: productId })
        if (!product) {
            res.status(400).json({ message: "no post with this id found" })
        }

        res.json(post)
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const deleteProduct = async (req,res)=>{
    const {productId}= req.params
    try{
        const existingProduct= await Product.findByIdAndDelete(productId)
        if(!existingProduct){
            res.json({message:"product not found"})
        }
        res.json({message:"product deleted",existingProduct})
    }catch(error){
        res.json(error.message)
    }
}

export const editProduct = async (req,res)=>{
    const {productId} = req.params
    const {title, description,price}= req.body
    try{
        const existingProduct = await Product.findByIdAndUpdate({productId},req.body,{new:true} )
        res.json({message:"product updated succesfuly",existingProduct})
    }catch(error){
        res.json(error)
    }
}

export const createFlash = async (req, res) => {
    const { title, description, price, image } = req.body;

    try {
        if (!title || !description || !price) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const existingAdmin = await Admin.findById(req.admin.id);
        if (!existingAdmin) {
            return res.status(404).json({ success: false, message: "admin not found" });
        }

        if (!image) {
            return res.status(400).json({ error: "No image provided." });
        }

        const uploadResponse = await cloudinary.uploader.upload(image);
        const post = new FlashSale({
            title,
            description,
            price,
            image: uploadResponse.secure_url,
        });

        const savedPost = await post.save();

        res.status(201).json({
            message: "flash sale created successfully!",
            post: savedPost
        });
    } catch (error) {
        console.error("❌ Post Creation Error:", error);
        res.status(500).json({
            error: "Internal server error",
            message: error.message
        });
    }
};
export const getAllFlash = async (req, res) => {
    try {
        const products = await FlashSale.find({})
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
}

export const deleteFlash = async (req, res) => {
    const { productId } = req.params
    try {
        const existingProduct = await FlashSale.findByIdAndDelete(productId)
        if (!existingProduct) {
            res.json({ message: "product not found" })
        }
        res.json({ message: "product deleted", existingProduct })
    } catch (error) {
        res.json(error.message)
    }
}