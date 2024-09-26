const mongoose = require("mongoose");

function  connectToDB(){
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log("connected  To Mongodb...")
    }catch (error){
        console.log("connection failed  To MongoDB", error)
    }
}
module.exports = connectToDB;