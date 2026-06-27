const mongoose=require('mongoose')

async function connectdb(){
    await mongoose.connect(process.env.MONGO_URI)
    console.log("mongodb connected successfully")
}

module.exports=connectdb