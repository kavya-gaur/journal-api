const express = require("express")
const path = require("path")
const journals = require("./data/journals")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./config/db")
const { connect } = require("http2")
const router = require("./routes/models/authroute")

dotenv.config()
const app = express()
app.use(cors())
connectDB()
app.use(express.json())
app.use("/api/journals",router)
const port = 8080


app.listen(port,()=>{
    console.log(`i am in port ${port}`);
})