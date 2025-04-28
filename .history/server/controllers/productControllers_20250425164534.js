import { Product } from '../model/productsmodel.js';
import { Post } from '../models/postModel.js';
import { User } from '../models/userModels.js'
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
//GETING OF ALL POSTS
// export const getpost = async (req, res) => {
//     try {
//         const { category } = req.query;
//         if (!category) return res.status(400).json({ error: "Category is required" })

//         const posts = await Post.find({ category }).populate("createdBy", "username phoneNumber profilepic").sort({ createdAt: -1 });
//         res.status(200).json(posts);
//     } catch (error) {
//         console.error("Error fetching posts by category:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };


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
