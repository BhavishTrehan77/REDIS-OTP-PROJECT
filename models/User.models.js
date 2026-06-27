const mongoose=require('mongoose')



const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    }
})


const User=mongoose.model('User',UserSchema)


module.exports=User