import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true, sparse: true },  
  password: { type: String },  
  avatar:{type:String},
  googleId: { type: String, unique: true, sparse: true },  
  email: { type: String, unique: true, required: true },  
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user'  
  }, 
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
export default User;
