const mongoose = require('mongoose');
const { Schema } = mongoose;

const clubSchema = new Schema({
  name: { type: String, required: true, unique: true },
  coach: { type: String },
  players: [{ type: Schema.Types.ObjectId, ref: 'Player', required: true }],  
});

const Club = mongoose.model('Club', clubSchema);
module.exports = Club;
