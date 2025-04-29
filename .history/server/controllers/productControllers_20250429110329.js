import { FlashSale } from '../model/flashSale.js';
import { Product } from '../model/productsmodel.js';
import cloudinary from '../utilis/cloudinary.js';
import {Admin} from '../model/adminmodel.js'; // Assuming you have an Admin model


export const createProduct = async (req, res) => {
    const { title, description, price ,image} = req.body;

    try {
        // Validate required fields
        if (!title || !description || !price) {
            return res.status(400).json({ error: 'All title, description, and price are required.' });
        }

        // Authenticate admin (assuming middleware attaches admin info to req)
        if (!req.admin || !req.admin.id) {
            return res.status(401).json({ error: 'Unauthorized: Admin not authenticated.' });
        }
        const existingAdmin = await Admin.findById(req.admin.id);
        if (!existingAdmin) {
            return res.status(404).json({ error: 'Admin not found.' });
        }

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        } else {
            return res.status(400).json({ error: 'Image is required.' });
        }

        const newProduct = new Product({
            title,
            description,
            price,
            image: imageUrl,
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({ message: 'Product created successfully!', product: savedProduct });
    } catch (error) {
        console.error('❌ Product Creation Error:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

export const getAllproducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({createdAt:-1});
        res.status(200).json(products);
    } catch (error) {
        console.error('❌ Get All Products Error:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

export const getOneproduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId); // Use findById for cleaner syntax
        if (!product) {
            return res.status(404).json({ message: 'Product not found with this ID.' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('❌ Get One Product Error:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Product ID format.' });
        }
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json({ message: 'Product deleted successfully.', deletedProduct });
    } catch (error) {
        console.error('❌ Delete Product Error:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Product ID format.' });
        }
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

export const editProduct = async (req, res) => {
    const { productId } = req.params;
    const { title, description, price, image } = req.body; // Destructuring from req.body

    try {
        // Check if the product exists
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        // Prepare the fields to update
        const updateFields = { title, description, price };

        // If there's an image, upload it to Cloudinary
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            updateFields.image = uploadResponse.secure_url;
        }

        // Update the product
        const updatedProduct = await Product.findByIdAndUpdate(productId, updateFields, { new: true, runValidators: true });

        if (!updatedProduct) {
            return res.status(500).json({ error: 'Failed to update product.' });
        }

        res.status(200).json({ message: 'Product updated successfully!', product: updatedProduct });
    } catch (error) {
        console.error('❌ Edit Product Error:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation error', message: error.message });
        }
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Product ID format.' });
        }
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};


// --- Flash Sale Controllers ---

export const createFlash = async (req, res) => {
    const { title, description, price, oldprice ,image} = req.body;

    try {
        // Validate required fields
        if (!title || !description || !price || !oldprice ) {
            return res.status(400).json({ error: 'All title, description, and price are required.' });
        }

        // Authenticate admin
        if (!req.admin || !req.admin.id) {
            return res.status(401).json({ error: 'Unauthorized: Admin not authenticated.' });
        }
        const existingAdmin = await Admin.findById(req.admin.id);
        if (!existingAdmin) {
            return res.status(404).json({ error: 'Admin not found.' });
        }

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        } else {
            return res.status(400).json({ error: 'Image is required.' });
        }

        const newFlashSaleItem = new FlashSale({
            title,
            description,
            oldprice,
            price,
            image: imageUrl,
        });

        const savedFlashSaleItem = await newFlashSaleItem.save();

        res.status(201).json({ message: 'Flash sale item created successfully!', flashSaleItem: savedFlashSaleItem });
    } catch (error) {
        console.error('❌ Flash Sale Creation Error:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

export const getAllFlash = async (req, res) => {
    try {
        const flashSaleItems = await FlashSale.find({});
        res.status(200).json(flashSaleItems);
    } catch (error) {
        console.error('❌ Get All Flash Sale Items Error:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

export const getOneflash = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await FlashSale.findById(productId); // Use findById for cleaner syntax
        if (!product) {
            return res.status(404).json({ message: 'Product not found with this ID.' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('❌ Get One Product Error:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Product ID format.' });
        }
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

export const deleteFlash = async (req, res) => {
    const { productId } = req.params; // Assuming productId refers to the FlashSale item ID
    try {
        const deletedFlashSaleItem = await FlashSale.findByIdAndDelete(productId);
        if (!deletedFlashSaleItem) {
            return res.status(404).json({ message: 'Flash sale item not found.' });
        }
        res.status(200).json({ message: 'Flash sale item deleted successfully.', deletedFlashSaleItem });
    } catch (error) {
        console.error('❌ Delete Flash Sale Item Error:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Flash Sale Item ID format.' });
        }
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

export const countProducts= async (req,res)=>{
    try{
        const count = await Product.countDocuments({})
        res.json(count)
    }catch(error){
        res.json(error)
    }
}