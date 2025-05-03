import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoutes.js";
import PostRoutes from "./routes/PostRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";
import EnquiryRoutes from './routes/EnquiryRoutes.js'

dotenv.config();

// Create the express app
const app = express();

// Middleware
const URL = process.env.FRONTEND_URL;
 
app.use(cors({
    origin:"https://yarnhaven.onrender.com",
credentials:true
}))


// Body parser limits
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());

// Routes
app.use("/admin", adminRoutes);
app.use("/products", PostRoutes);
app.use("/orders", OrderRoutes);
app.use("/enquiry", EnquiryRoutes);

// MongoDB connection
const PORT = process.env.PORT || 6000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
