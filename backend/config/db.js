import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/digi-shop', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connect mongoDb Successfully!")
    } catch (er){
        console.log(er)
    }
}
export default connectDB