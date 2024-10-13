import mongoose from "mongoose";
const { Schema } = mongoose;

const matchSchema = new Schema({
    ClubOne: { type: Schema.Types.ObjectId, ref: 'Club', required: true },
    ClubTwo: { type: Schema.Types.ObjectId, ref: 'Club', required: true },
    date: { type: Date, required: true },
    status: { 
      type: String, 
      enum: ['scheduled', 'ongoing', 'finished'], 
      default: 'scheduled' 
    },
    score: {
      ClubOne: { type: Number, default: 0 },
      ClubTwo: { type: Number, default: 0 },
    },
    goals: [{
      club: { type: Schema.Types.ObjectId, ref: 'Club' },
      player: { type: mongoose.SchemaTypes.ObjectId,ref:'Player' },  // Player's name
      time: { type: String },  // E.g. '45+2' for extra time
      assist:{type:String}
    }],
    cards:[{
      club: { type: Schema.Types.ObjectId, ref: 'Club' },
      player: { type: mongoose.SchemaTypes.ObjectId,ref:'Player' },  // Player's name
      time: { type: String },  // E.g. '45+2' for extra time
      color:{
        type:String,
        enum:['red','yellow'],
        default:'yellow'
      }
    }],
    comments: [{ body: String, date: Date }],
    
  });
  
  const Match = mongoose.model('Match', matchSchema);
  export default Match;
  