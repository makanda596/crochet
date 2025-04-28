import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createProduct, getAllproducts, getUserPosts, getOneproduct } from "../controllers/productControllers.js";
const router = express.Router();

router.post("/createpost", verifyToken, createProduct);
router.get("/allposts", verifyToken, getAllproducts);
router.get("/userposts/:id", getUserPosts);
router.get('/Onepost/:productId', getOneproduct )



export default router;

