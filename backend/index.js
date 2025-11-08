import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import {User} from './models/user.js'

dotenv.config()
connectDB()

const app = express();
app.use(cors())
app.use(express.json());
////////////////////////// Create Routes /////////////////

app.get('/hello', (req, res)=>{
    res.json({message: "HELLO"})
})

app.post("/signup", async (req, res)=>{
    const { username, email, password,  password2} = req.body;
    if(!username || ! email || !password || !password2){
        res.status(402).json({message: "Please Enter your info compeletly"})
    }
    if(password != password2){
        res.status(402).json({message: "Please enter passwords equal with them"})
    }
    let userWithThisUsername = await User.find({username: username})
    if(userWithThisUsername.length > 0){
        res.status(409).json({message: "You have signed up before it, please Sign in"})
    }
    const newUser = User({username, password, email})
    await newUser.save();
    res.status(200).json({message: "Your sign up is done, Welcome to Digi Shop"})
})

app.post('/signin', async(req, res)=>{
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400).json({ message: "Please enter your info complete"})
    }
    const filter = { email: email, password: password };
    const user = await User.findOne(filter)
    if(!user){
        res.status(404).json({ message: "The informatoin is wrong" })
    }
    res.status(200).json({ user: user, message: `Sign in successfully, welcome ${user.username}!`})
})

app.listen(5000, ()=>{
    console.log("WOW")
})