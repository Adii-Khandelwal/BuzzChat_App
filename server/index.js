import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from "./routes/userRoutes.js"; 
const app=express();
import dotenv from 'dotenv';
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes);

mongoose.connect("mongodb+srv://adii-khandelwal:qwerty01@cluster0.yqsmzuf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> {
    console.log("DB Connection Successful");})
.catch((err)=>{
console.log(err.message);
})

const server=app.listen(process.env.PORT, ()=>{
    console.log(`server started running on Port ${process.env.PORT}`);
});