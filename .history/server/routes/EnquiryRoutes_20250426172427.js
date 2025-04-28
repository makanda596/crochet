import express from 'express'

const router = express.Router()

router.post('/makeEnquiry', makeEnquiry)

export default router