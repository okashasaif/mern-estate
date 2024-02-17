import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter  from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import authRouter  from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';

dotenv.config();
mongoose.connect(process.env.MONGO).then (() => {
    console.log('Connected to mongoDB');
}).catch((err)=>{
    console.log(err)
});



const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 3000;
if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/dist"));
}
app.listen(PORT, ()=>{
    console.log(`server is running on port no ${PORT}`);
}
);

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use('/api/listing', listingRouter);


app.use((err,req,res,next)=>{

     const statusCode = err.statusCode || 500;
     const message = err.message || 'internal server error';
     return res.status(statusCode).json({
        success: false,
        statusCode,
        message
});
});