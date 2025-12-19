import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    products: [{product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"}, count: {type: Number, default: 1}}],
    deliveryType: {type: String, required: true},
    deliveryPrice: {type:Number, required: true},
    discount: {type:Number, required: false},
    price: {type: Number, required: true},
    date: {type: Date, default: Date.now()},
})

export const Order = mongoose.model("Order", OrderSchema)