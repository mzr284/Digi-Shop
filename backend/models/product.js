import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    tilte: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: false},
    avatar: {type: String, required: true},
    price: {type: Int16Array, required: true},
})

export const Product = mongoose.model("Product", productSchema)