import express from "express";
import helmet from "helmet";
import 'dotenv/config';
import cors from "cors";
const app=express();
const PORT=process.env.PORT;
app.use(express.json())
app.use(cors())
app.use(helmet())
app.get("/",(req,res)=>{
    res.json({message:"welcome to ASTU FC"})
})
app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})
export default app;