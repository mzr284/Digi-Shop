import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import {User} from './models/user.js'
import multer from "multer"

dotenv.config()
connectDB()

const app = express();
app.use(cors())
app.use(express.json());

/////////////////// upload files /////////////
// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })
// app.use("/uploads", express.static("uploads"))

////////////////////////// Create Routes /////////////////

app.get('/users', async (req, res)=>{
    try {
        const users = await User.find();
        res.json({ users: users })
    } catch(err){
       res.status(410).json({message: "Server Error", description: "An error has been happend from server"}) 
    }
})

app.post("/signup", async (req, res)=>{
    const { username, email, password,  password2} = req.body;
    if(!username || ! email || !password || !password2){
        res.status(402).json({message: "Sign up failed!", description: "Please Enter your info compeletly"})
    }
    if(password != password2){
        res.status(402).json({message: "Sign up failed!", description: "Please enter passwords equal with them"})
    }
    let userWithThisUsername = await User.find({username: username})
    if(userWithThisUsername.length > 0){
        res.status(409).json({message: "Sign up failed!", description: "You have signed up before it, please Sign in"})
        return
    }
    const newUser = User({username, password, email})
    await newUser.save();
    res.status(200).json({message: "Sign up successfully!", description: "Your sign up is done, Welcome to Digi Shop"})   
    
})

app.post('/signin', async(req, res)=>{
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400).json({message: "Sign in failed!", description: "Please enter your info complete"})
    }
    const filter = { email: email, password: password };
    const user = await User.findOne(filter)
    if(!user){
        res.status(404).json({message: "Sign in failed!", description: "The informatoin is wrong" })
    }
    res.status(200).json({message: "Sign in successfully!", user: user, description: `Sign in successfully, welcome ${user.username}!`})
})

app.delete('/delete-user/:id', async(req, res)=>{
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if(!user){
        res.status(404).json({message: "Delete fialed!", description: "Your user not found"})
    }
    res.status(200).json({message: "Delete successfully!", description: "Your user remove from data base"})
})

app.patch('/update-user/:id', async(req, res) => {
    const id = req.params.id;
    const newUser = await User.findByIdAndUpdate(id, req.body, {new: true})
    if(!newUser){
        res.status(404).json({ message: "Update failed!", description: "Your targrt user not found!"})
    }
    res.status(200).json({ message: "Updata Successfully!", description: "Your target user has been updated!" })
})

app.listen(5000, ()=>{
    console.log("WOW")
})