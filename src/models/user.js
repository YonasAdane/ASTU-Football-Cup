const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },  // Ideally hashed
    role: { 
        type: String,      
        enum: ['user', 'admin'], 
        default: 'admin' 
    }, 
  });
  
  const User = mongoose.model('User', userSchema);
  module.exports = User;
  