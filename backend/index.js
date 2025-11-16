import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import {User} from './models/user.js'
import multer from "multer"
import { Product } from "./models/product.js"

dotenv.config()
connectDB()

const app = express();
app.use(cors())
app.use(express.json());


////////////////////////// Create Routes /////////////////
//////////////////// USER /////////////////

app.get('/users', async (req, res)=>{
    try {
        const users = await User.find();
        res.json({ users: users })
    } catch(err){
       res.status(410).json({message: "Server Error", description: "An error has been happend from server"}) 
    }
})

app.get('/user/:id', async(req, res)=>{
    try {
        const id = req.params.id;
        const user = await User.findById(id)
        if(!user){
            res.status(404).json({message: "Get user faild!", description: "Not exists any users with this informatoin"})
            return
        }
        res.status(200).json({user: user})
    }
    catch(err){
        res.status(500).json({message: "Get user faild!", description: "An error accured when get user"})
    }
})

app.post("/signup", async (req, res)=>{
    const { username, email, password,  password2, roleState} = req.body;
    if(!username || ! email || !password || !password2){
        res.status(402).json({message: "Sign up failed!", description: "Please Enter your info compeletly"})
        return
    }
    if(password != password2){
        res.status(402).json({message: "Sign up failed!", description: "Please enter passwords equal with them"})
        return
    }
    let userWithThisUsername = await User.find({username: username})
    if(userWithThisUsername.length > 0){
        res.status(409).json({message: "Sign up failed!", description: "You have signed up before it, please Sign in"})
        return
    }
    const newUser = User({username, password, email})
    if(roleState == "admin"){
        newUser.isAdmin = true
    }else{
        newUser.isAdmin = false
    }
    await newUser.save();
    res.status(200).json({message: "Sign up successfully!", description: "Your sign up is done, Welcome to Digi Shop"})   
    
})

app.post('/signin', async(req, res)=>{
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400).json({message: "Sign in failed!", description: "Please enter your info complete"})
        return
    }
    const filter = { email: email, password: password };
    const user = await User.findOne(filter)
    if(!user){
        res.status(404).json({message: "Sign in failed!", description: "The informatoin is wrong" })
        return
    }
    res.status(200).json({message: "Sign in successfully!", user: user, description: `Sign in successfully, welcome ${user.username}!`})
})


app.delete('/delete-user/:id', async(req, res)=>{
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if(!user){
        res.status(404).json({message: "Delete fialed!", description: "Your user not found"})
        return
    }
    res.status(200).json({message: "Delete successfully!", description: "Your user remove from data base"})
})

app.patch('/update-user/:id', async(req, res) => {
    const id = req.params.id;
    const newUser = await User.findByIdAndUpdate(id, req.body, {new: true})
    if(!newUser){
        res.status(404).json({ message: "Update failed!", description: "Your targrt user not found!"})
        return
    }
    res.status(200).json({ message: "Updata Successfully!", description: "Your target user has been updated!" })
})

///////////////// PRODUCT /////////////////////

app.get('/products', async(req, res) => {
    try{
        const allProducts = await Product.find()
        res.status(200).json({products: allProducts})
    } catch(err){
        res.status(500).json({error: err})
    }
})

app.post('/add-product', async(req, res) => {
    const { category, description, image, price, rating, title } = req.body;
    if(!category || !image || !price || !rating || !title){
        res.status(400).json({msg: "Upload failed!", description: "Please fill in the all fields"})
        return
    }
    let productFilterByTitle = await Product.find({ title: title })
    if(productFilterByTitle.length > 0){
        res.status(400).json({msg: "Upload failed!", description: "This product already exists!"})
        return
    }
    const newProduct = Product({category, description, image, price, rating, title})
    await newProduct.save();
    res.status(200).json({product: newProduct, msg: "Upload successfully!"})
})

app.post("/add-products", async(req, res) => {
    const listProducts = req.body.products;
    await Product.insertMany(listProducts);
    res.json({product: listProducts})
})

app.delete("/delete-products", async(req, res) => {
    try{
        await Product.deleteMany({});
        res.status(200).json({msg: "Remove Successfully!", description: "All products has been removed."})
    } catch(err) {
        res.status(500).json({msg: "Server Error", description: "An error has been accured!", error: err})
    }
})

app.listen(5000, ()=>{
    console.log("WOW")
})