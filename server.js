require('dotenv').config()
const express=require('express')
const connectdb = require('./config/db');
const router = require('./routes/otp.routes');
require("./config/redis");
const app=express()
app.use(express.json())





connectdb()

app.use("/api/v1/otp",router)


app.listen(3000)