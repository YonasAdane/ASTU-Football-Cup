import mongoose from "mongoose";
const { Schema } = mongoose;

const matchSchema = new Schema({
    ClubOne: {
      club:{ type: Schema.Types.ObjectId, ref: 'Club', required: true },
      score:{ type: Number, default: 0 },
      lineup:[{type:Number}],
      straitLineUp:[{
        player:{
        type: Schema.Types.ObjectId, ref: 'Player' 
      },
        position:{
          Number:{type:Number},
          name:{type:String}
        }
      }], 
      bench:[{
        type: Schema.Types.ObjectId, ref: 'Player' 
      }]
    },
    ClubTwo: {
      club:{ type: Schema.Types.ObjectId, ref: 'Club', required: true },
      score:{ type: Number, default: 0 },
      lineup:[{type:Number}],
      straitLineUp:[{player:{
        type: Schema.Types.ObjectId, ref: 'Player' 
      },
        position:{
          Number:{type:Number},
          name:{type:String}
        }
      }],
      bench:[{
        type: Schema.Types.ObjectId, ref: 'Player' 
      }]
    },
    date: { type: Date, required: true },
    status: { 
      type: String, 
      enum: ['scheduled', 'ongoing', 'finished'], 
      default: 'scheduled' 
    },
    goals: [{
      club: { type: Schema.Types.ObjectId, ref: 'Club' },
      player: { type: mongoose.SchemaTypes.ObjectId,ref:'Player' },  // Player's name
      time: { type: String },  // E.g. '45+2' for extra time
      assist:{type: mongoose.SchemaTypes.ObjectId,ref:'Player'|| String }
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
    manOfTheMatch:{
      type: Schema.Types.ObjectId, ref: 'Player' 
    },
    comments: [{ body: String, date: Date }],
    
  });

  const Match = mongoose.model('Match', matchSchema);
  export default Match;
  