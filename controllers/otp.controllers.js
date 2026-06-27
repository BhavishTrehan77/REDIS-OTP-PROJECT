const OTPService=require('../services/opt.services')


const SendOTP=async(req,resp)=>{
    const data=await OTPService.sendOtp(req.body)
    resp.json(data)
}

const VerifyOTP=async(req,resp)=>{
    const data=await OTPService.VerifyOtp(req.body)
    resp.json(data)
}

const ResendOTP=async(req,resp)=>{
    const data=await OTPService.Resendotp(req.body)
    resp.json(data)
}

module.exports={
    SendOTP,
    VerifyOTP,
    ResendOTP
}