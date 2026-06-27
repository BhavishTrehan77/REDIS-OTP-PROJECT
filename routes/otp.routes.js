const express=require('express')
const { SendOTP, VerifyOTP, ResendOTP } = require('../controllers/otp.controllers')


const router=express.Router()



router.post("/send",SendOTP)
router.post("/verify",VerifyOTP)
router.post("/resend",ResendOTP)


module.exports=router