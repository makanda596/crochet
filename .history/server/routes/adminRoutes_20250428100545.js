import express from 'express'
import { adminSignup, adminLogin, update, checkAuth, logout,profile }from '../controllers/admin.js'
import { verifyToken } from '../middleware/verifyToken.js'
const router = express.Router()

router.post('/login', adminLogin)
router.get('/check-auth', verifyToken, checkAuth)
router.put('/update',verifyToken, update) 
router.post('/signUp', adminSignup)
router.post('/logout', logout)
router.get('/profle',verifyToken,profile)
export default router