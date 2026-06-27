const Redis=require('ioredis')



const redis=new Redis({
    host: 'localhost',
    port: 6379
})


redis.on("connect",()=>{
    console.log("connection done")
})

redis.on("error",(err)=>{
    console.log(err.message)
})


module.exports=redis