const  transporter  = require("../config/mail")
const redis = require("../config/redis")
const GenerateToken = require("../helper/jwt.helper")
const GenerateOTP = require("../helper/otp.helper")
const User = require("../models/User.models")






const sendOtp=async(body)=>{
     const{email}=body
    const limitKey=`otp-limit:${email}`
    const requests=await redis.incr(limitKey)

    if(requests===1){
        await redis.expire(limitKey, 60);
    }
    if (requests > 3) {
    throw new Error("Too many OTP requests. Try again after 1 minute.");
}   

   
    if(!email){
        throw new Error("email not exists")
    }
    let user=await User.findOne({email})
     if (!user) {

        user = await User.create({
            email
        });

    }
    const otp=GenerateOTP()

    await redis.set(`otp:${email}`,otp,"EX",300)

    await transporter.sendMail({
        from:process.env.EMAIL,
        to:user.email,
          subject: "OTP Verification",

        text: `Your OTP is ${otp}`
    })
    return {
        success:true,
        message:"otp sent successfull"
    }


}
const Resendotp=async(body)=>{
    const{email}=body
    if(!email){
        throw new Error("Email required")
    }
    const user=await User.findOne({email})
 if (!user) {
        throw new Error("User not found");
    }
    await redis.del(`otp:${email}`)

    const otp=GenerateOTP()

     await redis.set(`otp:${email}`, otp, "EX", 300);4

     await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Resend OTP",
        text: `Your New OTP is ${otp}`
     })
      return {
        success: true,
        message: "New OTP Sent Successfully"
    };
}
const VerifyOtp=async(body)=>{
    const{email,otp}=body
    if (!email || !otp) {

        throw new Error("Email and OTP required");

    }
    const attemptKey = `otp-attempt:${email}`;

const attempts = await redis.get(attemptKey);

if (attempts >= 5) {
    throw new Error("Too many wrong attempts. Try again after 10 minutes.");
}
    

    const redisOTP=await redis.get(`otp:${email}`);
     if (!redisOTP) {

        throw new Error("OTP Expired");

    }
     if (redisOTP != otp) {

    const attempts = await redis.incr(attemptKey);

    if (attempts === 1) {
        await redis.expire(attemptKey, 600); 
    }

    throw new Error(`Invalid OTP. Attempts Left: ${5 - attempts}`);
    }
    await redis.del(`otp:${email}`)
    await redis.del(attemptKey);

    await User.findOneAndUpdate({email},{verified:true})
    

    const Token=GenerateToken({email})

    return{
        success:true,
        message:"otp verified",
        Token
    }
}


module.exports={
    sendOtp,
    VerifyOtp,
    Resendotp
}

