import express from 'express'
import { adminSignup, adminLogin, update, checkAuth }from '../controllers/admin'
import { verifyToken } from '../middleware/verifyToken'
const router = express.Router()

router.post('/login', adminLogin)
router.get('/check-auth', verifyToken, checkAuth)
router.put('/update',verifyToken, update) 

router.post('/signUp', adminSignup)
router.post('/logout', logout)
export default router