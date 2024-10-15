import mongoose from "mongoose";
const { Schema } = mongoose;

const scheduleSchema = new Schema({
    matches: { type: Schema.Types.ObjectId, ref: 'Match', required: true },
    date: {
      begin:{ type: Date, required: true },
      end:{ type: Date, required: true }
    },
    venue: { type: String, required: true },
  });
  
  const Schedule = mongoose.model('Schedule', scheduleSchema);
  export default Schedule;
  