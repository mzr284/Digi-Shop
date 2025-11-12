import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    avatar: {type: String, required: false},
    isActive: {type: Boolean, default: true},
    cart: [{type: mongoose.Schema.Types.ObjectId, ref: 'product'}],
})

export const User = mongoose.model("User", userSchema)