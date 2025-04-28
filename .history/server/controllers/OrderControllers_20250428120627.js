
// --- Order Controller ---

import { Admin } from "../model/adminmodel.js";
import Order from "../model/Order.js";

// Add a new order (for admin)
export const addOrder = async (req, res) => {
    try {
        const { orderName, description, phoneNumber,amount } = req.body;

        // Validate required fields
        if (!orderName || !description || !phoneNumber ||!amount) {
            return res.status(400).json({ error: 'Order name, description, and phone number are required.' });
        }

        // Check if admin is authenticated
        if (!req.admin || !req.admin.id) {
            return res.status(401).json({ error: 'Unauthorized: Admin not authenticated.' });
        }
        const existingAdmin = await Admin.findById(req.admin.id);
        if (!existingAdmin) {
            return res.status(404).json({ error: 'Admin not found.' });
        }

        const newOrder = new Order({
            orderName,
            description,
            phoneNumber,
            amount,
            //  The date defaults to now, and status defaults to pending.
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({ message: 'Order created successfully!', order: savedOrder });
    } catch (error) {
        console.error('❌ Add Order Error:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

// Toggle the status of an order (complete/pending) - for admin
export const toggleOrderStatus = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Check if admin is authenticated
        if (!req.admin || !req.admin.id) {
            return res.status(401).json({ error: 'Unauthorized: Admin not authenticated.' });
        }

            const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        order.status = "complete";  // update the order
        const updatedOrder = await order.save();

        res.status(200).json({ message: 'Order status updated successfully.', order: updatedOrder });
    } catch (error) {
        console.error('❌ Toggle Order Status Error:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Order ID format.' });
        }
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};
export const cancelStatus = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Check if admin is authenticated
        if (!req.admin || !req.admin.id) {
            return res.status(401).json({ error: 'Unauthorized: Admin not authenticated.' });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        order.status = "cancelled";  // update the order
        const updatedOrder = await order.save();

        res.status(200).json({ message: 'Order status updated successfully.', order: updatedOrder });
    } catch (error) {
        console.error('❌ Toggle Order Status Error:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Order ID format.' });
        }
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};
// Delete an order (for admin)
export const deleteOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Check if admin is authenticated
        if (!req.admin || !req.admin.id) {
            return res.status(401).json({ error: 'Unauthorized: Admin not authenticated.' });
        }
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        res.status(200).json({ message: 'Order deleted successfully.', deletedOrder });
    } catch (error) {
        console.error('❌ Delete Order Error:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Order ID format.' });
        }
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

// Get all orders (for admin)
export const getAllOrders = async (req, res) => {
    try {
        // Check if admin is authenticated
        if (!req.admin || !req.admin.id) {
            return res.status(401).json({ error: 'Unauthorized: Admin not authenticated.' });
        }
        const orders = await Order.find().sort({ createdAt: -1 }); // Sort by creation date, newest first
        res.status(200).json(orders);
    } catch (error) {
        console.error('❌ Get All Orders Error:', error);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};

export const countOrders = async (req,res)=>{
    try{
        const count = await Order.countDocuments({})
        res.json(count)
    }catch(error){
        res.json(error)
    }
}

export const getOrder = async (req, res) => {
    try {
        const { id } = req.params; // Use `id` directly
        const order = await Order.findById(id); // No need to wrap `id` in an object

        if (!order) {
            return res.status(404).json({ message: 'No order found' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
