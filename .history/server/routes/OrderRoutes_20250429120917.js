import express from 'express'
import { addOrder, toggleOrderStatus, deleteOrder, getAllOrders, countOrders, cancelStatus,getOrder } from '../controllers/OrderControllers.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.post('/addOrder', verifyToken, addOrder)
router.post("/completeStatus/:orderId", verifyToken, toggleOrderStatus)
router.post("/cancelStatus/:orderId", verifyToken, cancelStatus)
router.delete('/deleteOrder/:orderId', verifyToken, deleteOrder)
router.get('/getorders', verifyToken, getAllOrders)
router.get('/getorder/:id', verifyToken, getOrder)
router.get('/count',countOrders)

export default router