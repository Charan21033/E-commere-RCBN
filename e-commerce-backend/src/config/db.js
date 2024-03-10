const mongoose = require("mongoose")
require('dotenv').config()
const mondbURL =process.env.DATABASE_URL


const connectDb=()=>{
     mongoose.connect(mondbURL).then
    console.log("DataBase Connection Established")
}

module.exports=connectDb