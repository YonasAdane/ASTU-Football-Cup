import express from "express";
import helmet from "helmet";
import 'dotenv/config';
import cors from "cors";
import { routes } from "./routes/route.js";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import { errorHandler } from "./middleware/errorhandler.middleware.js";
const app=express();

app.use(session({
    secret: process.env.SESSION_KEY,
    store: MongoStore.create({ mongoUrl:process.env.MONGO_URI }),
    resave: false, 
    saveUninitialized: false, 
}));

  
  app.use(passport.initialize());
  app.use(passport.session());
  
app.use(cors())
const PORT=process.env.PORT;
app.use(express.json())
app.use(helmet())
app.get("/",(req,res)=>{
    res.json({message:"welcome to ASTU FC"})
})
app.use('/api/v1',routes)
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})

const MongoURI=process.env.MONGO_URI;
mongoose.connect(MongoURI)
        .then(result=>console.log('mongo connected'))
        .catch(err=>console.error("connection failed  :",err));
export default app;