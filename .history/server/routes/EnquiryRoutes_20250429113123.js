import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { makeEnquiry,GetEnquiry} from '../controllers/EnquiryControllers.js'
const router = express.Router()

router.post('/makeEnquiry', makeEnquiry)
router.post('/getquiry',verifyToken, GetEnquiry)

export default router 