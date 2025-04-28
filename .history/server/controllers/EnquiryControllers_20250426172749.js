import { Enquiry } from "../model/Enquiry.js";
import cloudinary from "../utilis/cloudinary.js";

export const makeEnquiry = async (req, res) => {
    const { name, description, phoneNumber,image} = req.body;

    try {
        // Validate required fields
        if (!name || !description || !phoneNumber) {
            return res.status(400).json({ error: 'All phoneNumber, description, and name are required.' });
        }
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        } else {
            return res.status(400).json({ error: 'Image is required.' });
        }

        const newEnquiry = new Enquiry({
            name,
            description,
            phoneNumber,
            image: imageUrl,
        });

        const savedEnquiry = await newEnquiry.save();

        res.status(201).json({ message: 'Product created successfully!', Enquiry: savedEnquiry });
    } catch (error) {
        console.error('❌ Product Creation Error:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};
