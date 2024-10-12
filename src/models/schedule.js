const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduleSchema = new Schema({
    match: { type: Schema.Types.ObjectId, ref: 'Match', required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
  });
  
  const Schedule = mongoose.model('Schedule', scheduleSchema);
  module.exports = Schedule;
  