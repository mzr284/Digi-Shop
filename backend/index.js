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

app.get('/product/:productId', async(req, res) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if(!product){
        res.status(404).json({msg: "Upload product failed!", description: "Not found any product with this id."})
    }
    res.status(200).json({ product: product })
})

app.post('/add-product', async(req, res) => {
    const { category, description, image, price, rating, votersCount, title, count } = req.body;
    if(!category || !image || !price || !rating || !votersCount || !title || !count){
        res.status(400).json({msg: "Upload failed!", description: "Please fill in the all fields"})
        return
    }
    let productFilterByTitle = await Product.find({ title: title })
    if(productFilterByTitle.length > 0){
        res.status(400).json({msg: "Upload failed!", description: "This product already exists!"})
        return
    }
    const newProduct = Product({category, description, image, price, rating, votersCount, title, count})
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

app.patch('/update-product/:productId', async(req, res)=>{
    const productId = req.params.productId;
    const product = await Product.findByIdAndUpdate(productId, req.body, {new: true});
    if(!product){
        res.status(404).json({message: "The product not found!"}); return;
    }
    await product.save();
    res.status(200).json({message: "Updata Successfully!", new_Product: product});
})

///////////////////// CART /////////////////////////

app.post('/add-cart', async(req, res) => {
    try {
        const { productId, userId } = req.body;
        const user = await User.findById(userId)
        const product = await Product.findById(productId)
        const exists = user.cart.find(item => item.product == productId)
        if(exists){
            res.status(405).json({msg: "Added failed!", description: "This product already exists in your cart!"}); return
        }
        user.cart.push({ product: product, count: 1 })
        await user.save();
        res.status(200).json({msg: "Added Successfully!", description: `The product Added to your cart.`, cart: user.cart})
    } catch(err){
        res.status(500).json({msg: "Server error", description: "An error has benn happened."})
    }
})

app.patch('/clear-cart/:id', async(req, res) => {
    try{
        const userId = req.params.id;
        const newUser = await User.findByIdAndUpdate(userId, {cart: []}, {new: true})
        res.status(200).json({cart: newUser.cart})
    } catch(err){
        res.status(500).json({msg: "Server error", description: "An error has benn happened."})
    }
})

app.patch('/change-count/:userId/:itemId', async(req, res) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
    const amount = parseInt(req.body.amount);
    const user = await User.findById(userId);
    const item = user.cart.find(it => it._id == itemId)
    if(item.count + amount > 0){
        item.count += amount;
    }
    await user.save();
    res.status(200).json({item: item})
})

app.get("/products/user/:id", async(req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("cart.product")
    res.status(200).json({cart: user.cart})
})

app.patch("/remove-item/:userId/:productId", async(req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    const user = await User.findById(userId)
    if(!user){
        res.status(404).json({msg: "Remove item failed!", description: "Please sign in your account before it"}); return
    }
    const newCart = user.cart.filter(item => item._id != productId)
    user.cart = newCart
    await user.save();
    res.status(200).json({msg: "Remove successfully!", description: "This item remove from your cart.", cart: user.cart})
})

app.patch("/remove-cart/:userId", async(req, res) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if(!user){
        res.status(404).json({msg: "Remove item failed!", description: "Please sign in your account before it"}); return
    }
    user.cart = []
    await user.save();
    res.status(200).json({msg: "Remove successfully!", description: "Whole of items has been removed!", cart: user.cart})
})

app.listen(5000, ()=>{
    console.log(">> Server Execute!")
})