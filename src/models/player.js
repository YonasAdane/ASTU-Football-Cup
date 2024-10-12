const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
    name: { type: String, required: true },
    club: { type: Schema.Types.ObjectId, ref: 'Club', required: true },
    position: { type: String },  // E.g. Forward, Midfielder
    jerseyNumber: { type: Number },
    goals: { type: Number, default: 0 },
    assist:{type:string}
  });
  
  const Player = mongoose.model('Player', playerSchema);
  module.exports = Player;
  