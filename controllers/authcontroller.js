const User = require("../routes/models/usermodel")
const bcrypt = require("bcrypt")
const asyncHandler = require("async-handler")
const jwt = require("jsonwebtoken")
const Journal = require("../routes/models/journalmodel")
const { ObjectId } = require("mongoose").Types;

const registerController = async (req,res)=>{
    const {name,email,password}=req.body
    console.log("i am in register controller");
    if(!email || !name || !password){
        res.status(400).json({error:"All fields are mandatory"})
    }

    const existingUser = await User.findOne({email})
    if(existingUser){
        console.log(existingUser);
        res.status(400).json({ error: "Email is already registered" });
    }

    else{
        const hashedPassword = await bcrypt.hash(password,10);
        
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        if(user){
            res.status(200).json({name,email});
        }
        else res.status(500).json({ error: "Invalid characters" });
    }
}
    
const loginController = async (req,res)=>{
        const {email,password}=req.body
        console.log("i am in login controller");
        if(!email || !password){
            res.status(400).json({error:"All fields are mandatory"})
        }
    
        try{
            const user = await User.findOne({email})
        console.log(user);
        if(!user){
            res.status(400).json({ error: "Invalid Credentials" });
        }
        else{
            const match = await bcrypt.compare(password,user.password)
            if(match){
                const token = jwt.sign({_id:user._id},process.env.JWT_TOKEN)
                console.log(user._id);
                res.status(200).json(
                    {
                        name: user.name,
                        email: user.email,
                        id:user.id,
                        token: token,
                    }
                );
            }
            else{
                res.status(401).json({ error: "Invalid Credentials" });
            }
        }
        }
        catch(error){
            console.log(error);
        }
}

const journalController = async (req,res)=>{
    const {title,description,userId,date}=req.body
    console.log("i am in journal controller");
    console.log(title,description,userId,date);
    if(!userId){
        res.status(400).json({error:"All fields are mandatory"})
    }
   
    try {
        if (!ObjectId.isValid(userId)) {
            res.status(400).json({ error: "Invalid userId format" });
            return;
        }
        const user = User.findById(userId)
        if(!user){
        res.status(400).json({ error: "User not found with this id" });
        }
    
    const journal = await Journal.create({title,description,userId,date});
    if(journal){
        res.status(200).json(
            {
                title,description,userId,date
            }
        );
    }
    else{
        res.status(400).json({ error: "JOurnal cant be created" });
    }
    } catch (error) {
        console.log(error);
    }
}

const getJournalsController = async (req,res)=>{
    const {userId}=req.body
    console.log("i am in getJournalsController");
    console.log(userId);
    if(!userId){
        res.status(400).json({error:"All fields are mandatory"})
    }
   
    try {
        if (!ObjectId.isValid(userId)) {
            res.status(400).json({ error: "Invalid userId format" });
            return;
        }
        const user = User.findById(userId)
        if(!user){
        res.status(400).json({ error: "User not found with this id" });
        }
    
    // const journal = await Journal.create({title,description,userId});
        const journals = await Journal.find({userId})
        if(journals){
            res.status(200).json(
                {
                    journals
                }
            );
        }
        else{
            res.status(400).json({ error: "Journalls cant be fetched" });
        }
    } catch (error) {
        console.log(error);
    }
}

const updateJournalController = async (req,res)=>{
    const {title,description,journalId, userId,date}=req.body
    console.log("i am in journal controller");
    if(!journalId){
        return res.status(400).json({error:"All fields are mandatory"})
    }
    try {
        if (!ObjectId.isValid(userId)) {
            res.status(400).json({ error: "Invalid userId format" });
            return;
        }
        const user = User.findById(userId)
        if(!user){
            return res.status(400).json({ error: "User not found with this id" });
        }
        const journal = await Journal.findByIdAndUpdate(journalId,{title,description})
    if(journal){
        const new_journal = await Journal.findById(journalId);
        return res.status(200).json(
            {
                new_journal
            }
        );
    }
    else{
        return res.status(400).json({ error: "JOurnal cant be created" });
    }
    } catch (error) {
        console.log(error);
    }
}

const deleteJournalController = async (req,res)=>{
    const {journalId}=req.body
    console.log("i am in journal controller");
    if(!journalId){
        return res.status(400).json({error:"All fields are mandatory"})
    }
    try {
        
        const journal = await Journal.findByIdAndDelete(journalId)
        if(journal){
            const deleted_journal = await Journal.findById(journalId);
            if(!deleted_journal) return res.status(200).json(
                {
                    message:"Deleted succesffully"
                }
            );
        }
    else{
        return res.status(400).json({ error: "JOurnal cant be deleted" });
    }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {registerController,loginController,journalController,getJournalsController,updateJournalController,deleteJournalController}