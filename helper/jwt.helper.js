
const jwt=require('jsonwebtoken')
const GenerateToken=(payload)=>{
    return jwt.sign(payload, process.env.JWT_SECRET,{

            expiresIn: "1d"

        })
}
module.exports=GenerateToken