import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createProduct, getAllproducts, getOneproduct, deleteProduct ,editProduct } from "../controllers/productControllers.js";
const router = express.Router();

router.post("/createpost", verifyToken, createProduct);
router.get("/allposts", verifyToken, getAllproducts);
router.get('/Onepost/:productId', getOneproduct )
router.delete('/delete/:productId',verifyToken,deleteProduct)
router.put('/edit/:productId',verifyToken,editProduct )

export default router;

