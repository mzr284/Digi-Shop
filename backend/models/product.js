import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    category: {type: String, required: true},
    description: {type: String, required: false},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    rating: {type: Number, required: true, default: 0},
    title: {type: String, required: true},
})

export const Product = mongoose.model("Product", productSchema)