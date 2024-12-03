import mongoose from 'mongoose';
const { Schema } = mongoose;

const playerSchema = new Schema({
    name: { type: String, required: true },
    studentId:{type:String},
    status:{type:String,enum:["active","inactive"],default:"active"},
    avatar:{
      public_id:String,
      url:String
    },
    club: { type: Schema.Types.ObjectId, ref: 'Club' },
    position: { type: String },  // E.g. Forward, Midfielder
    jerseyNumber: { type: Number },
    goals: { type: Number, default: 0 },
    assist:{type:Number},
    redCard:{type:Number, default:0},
    yellowCard:{type:Number, default:0},
    });
  
  const Player = mongoose.model('Player', playerSchema);
  export default Player;
  