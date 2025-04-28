import { Enquiry } from "../model/Enquiry.js";

export const makeEnquiry = async (req, res) => {
    const { name, description, phoneNumber} = req.body;

    try {
        // Validate required fields
        if (!name || !description || !phoneNumber) {
            return res.status(400).json({ error: 'All phoneNumber, description, and name are required.' });
        }
       

        const newEnquiry = new Enquiry({
            name,
            description,
            phoneNumber,
        });

        const savedEnquiry = await newEnquiry.save();

        res.status(201).json({ message: 'Product created successfully!', Enquiry: savedEnquiry });
    } catch (error) {
        console.error('❌ Product Creation Error:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};
export const GetEnquiry = async (req, res) => {
    try {
        const Enquiries = await Enquiry.find({}).sort({createdAt:-1});
        res.status(200).json(Enquiries);
    } catch (error) {
        console.error('❌ Get All Enquiries Error:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

