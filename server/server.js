const express=require('express')
const connectDB=require('./config/db')
const dotenv=require('dotenv')
const cookieParser=require('cookie-parser')
const path=require('path')

const app=express()
dotenv.config()
// const __dirname=path.resolve()

const port=process.env.PORT || 8080;

app.use(express.json())
app.use(cookieParser())

//mongo db
connectDB()

//api route
app.use('/api/user',require('./routes/userRouter'))
app.use('/api/listing',require('./routes/listRouter'))

app.use(express.static(path.join(__dirname,'/client/dist')))
app.get("*",(req,res,next)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})



//middleware
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})



app.listen(port,()=>{
    console.log(`server running ${port}`)
})

