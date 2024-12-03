import mongoose from "mongoose";
import { Schema } from "mongoose";

const scoreboardSchema = new Schema({
  club: { type: Schema.Types.ObjectId, ref: 'Club', required: true },
  matchesPlayed: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  goalsFor: { type: Number, default: 0 },    // Total goals scored by the club
  goalsAgainst: { type: Number, default: 0 }, // Total goals conceded by the club
  goalDifference: { type: Number, default: 0 }, // Calculated as goalsFor - goalsAgainst
  points: { type: Number, default: 0  },       // 3 points for a win, 1 for a draw
});

const Scoreboard = mongoose.model('Scoreboard', scoreboardSchema);
export default Scoreboard;
