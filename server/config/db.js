const mongoose=require('mongoose')
const MONGO_DB="mongodb+srv://Pavitra:Pnaik1234@cluster0.9exobhz.mongodb.net/real-estate"

const connectDB=async()=>{
    try {
        await mongoose.connect(MONGO_DB)
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
    }
}
module.exports=connectDB;