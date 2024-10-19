import express from "express";
import helmet from "helmet";
import 'dotenv/config';
import cors from "cors";
import { routes } from "./routes/route.js";
import mongoose from "mongoose";
import passport from "passport";
import cookieSession from "cookie-session";
const app=express();

app.use(
    cookieSession({ name: "session", keys: [process.env.SESSION_KEY], maxAge: 24 * 60 * 60 * 1000*7 })
  );
  
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
app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})

const MongoURI=process.env.MONGO_URI;
mongoose.connect(MongoURI)
        .then(result=>console.log('mongo connected'))
        .catch(err=>console.error("connection failed  :",err));
export default app;