import express from 'express'
import { addOrder, toggleOrderStatus, deleteOrder ,getAllOrders } from '../controllers/OrderControllers.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.post('/addOrder', verifyToken, addOrder)
router.post("/orderStatus/:orderId", verifyToken, toggleOrderStatus)
router.delete('/deleteOrder/:orderId', verifyToken, deleteOrder)
router.get('/getorders',verifyToken,getAllOrders )

export default router