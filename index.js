import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import hotelsRoute from './routes/hotels.js'
import usersRoute from './routes/users.js'
import roomsRoute from './routes/rooms.js'
import authRoute from './routes/auth.js'



const app = express()
dotenv.config()
app.use(express.json())

const connect = async ()=>{
try {
    await mongoose.connect(process.env.MONGO);
    console.log('connected to mongodb')
  } catch (error) {
    throw error
  }
}
mongoose.connection.on("disconnect",()=>{
    console.log('mongodb connected')
})

app.use('/api/users',usersRoute)
app.use('/api/hotels',hotelsRoute)
app.use('/api/rooms',roomsRoute)
app.use('/api/auth',authRoute)

// Error Handeler 
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || 'somting went wrong'
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})

app.listen(5000,()=>{
    connect()
    console.log('backend redy')
})