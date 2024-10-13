import mongoose from 'mongoose';
const { Schema } = mongoose;

const playerSchema = new Schema({
    name: { type: String, required: true },
    club: { type: Schema.Types.ObjectId, ref: 'Club' },
    position: { type: String },  // E.g. Forward, Midfielder
    jerseyNumber: { type: Number },
    goals: { type: Number, default: 0 },
    assist:{type:Number}
  });
  
  const Player = mongoose.model('Player', playerSchema);
  export default Player;
  