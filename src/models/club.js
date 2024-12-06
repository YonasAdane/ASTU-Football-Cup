import mongoose from "mongoose";

const { Schema } = mongoose;

const clubSchema = new Schema({
  name: { type: String, required: true, unique: true },
  abbreviation:{type:String},
  description:{type:String},
  coach: { type: String },
  coachPhoto:{
    public_id:String,
    url:String
  },
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],  
  logo:{
    public_id:String,
    url:String
  }
});

const Club = mongoose.model('Club', clubSchema);
export default Club;
