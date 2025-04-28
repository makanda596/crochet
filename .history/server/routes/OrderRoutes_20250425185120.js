import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
  
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        // You might want to add a regex validator for phone number format
        // Example (for a simplified Kenyan number format):
        match: /^(\+?254)?(7(?:[0-9]{8}))$/,
        // message: 'Invalid phone number format.  Example: +254712345678 or 712345678',
    },
    status: {
        type: String,
        enum: ['complete', 'pending'], // Use an enum for predefined values
        default: 'pending', // Set the default status to "pending"
    },
    // You can add more fields as needed, e.g.,
    // customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //  reference to the User model
    // totalAmount: { type: Number, required: true },
    // items: [{
    //     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    //     quantity: { type: Number, required: true, min: 1 },
    //     price: {type: Number, required: true}
    // }],
    createdAt: { //timestamps
        type: Date,
        default: Date.now
    },

}, { timestamps: true }); // Add createdAt and updatedAt fields automatically

const Order = mongoose.model('Order', orderSchema);

export default Order;
