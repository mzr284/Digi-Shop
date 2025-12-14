import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    products: [{product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"}, count: {type: Number, default: 1}}],
    price: {type: Number, required: true},
    date: {type: Date, default: Date.now()},
})

export const Order = mongoose.model("Order", OrderSchema)