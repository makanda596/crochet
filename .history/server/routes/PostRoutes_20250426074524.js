import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createProduct, getAllproducts, getOneproduct, createFlash, getAllFlash,countProducts,
     deleteProduct, editProduct, deleteFlash } from "../controllers/productControllers.js";
const router = express.Router();

router.post("/createpost", verifyToken, createProduct);
router.post("/createFlash", verifyToken, createFlash);
router.get("/allproducts", verifyToken, getAllproducts);
router.get("/allflashsales", verifyToken, getAllFlash);
router.get('/Oneproduct/:productId', getOneproduct )
router.delete('/delete/:productId', verifyToken, deleteProduct)
router.delete('/deleteflash/:productId', verifyToken, deleteFlash)
router.put('/edit/:productId',verifyToken,editProduct )
router.get('/count',verifyToken,countProducts)

export default router;

