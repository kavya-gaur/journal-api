const mongoose = require("mongoose")
const dotenv= require("dotenv")

const connectDB = async ()=>{
    try {
        const con = await mongoose.connect(process.env.URL)
        console.log(process.env.URL);
        console.log("connected");
        console.log(con.connection.host);
        console.log(con.connection.name);
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDB;