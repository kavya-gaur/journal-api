const mongoose = require("mongoose")


const journalSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String,
        
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
})

module.exports = mongoose.model("journals",journalSchema)