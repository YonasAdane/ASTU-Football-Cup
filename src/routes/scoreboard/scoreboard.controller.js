import Scoreboard from "../../models/scoreBoard.js";

async function getScoreboardHandler(req,res){
    const data=await Scoreboard.find({});
    return res.json(data)
}

async function createScoreboardHandler(req,res){
    const {clubId}=req.body;
    const NewScoreboard=await Scoreboard.create({
        data:{
           club:clubId
        }
    })
    return res.json(NewScoreboard);
}

async function updateScoreboardHandler(req,res){
    const scoreboardId=req.params.id;
    const {
        matchesPlayed,
        wins,
        draws,
        losses,
        goalsFor,
        goalsAgainst,
        goalDifference,
        points}=req.body;
    const NewScoreboard=await Scoreboard.findByIdAndUpdate({
        id:scoreboardId,
        data:{
            matchesPlayed,
            wins,
            draws,
            losses,
            goalsFor,
            goalsAgainst,
            goalDifference,
            points,
        }
    })
    return res.json(NewScoreboard);
}

async function ScoreboardDetailsHandler(req,res){
    const scoreboardId=req.params.id
    const ScoreboardDetail=await Scoreboard.findById(scoreboardId);
    return res.json(ScoreboardDetail);
}
async function deleteScoreboardHandler(req,res){
    const scoreboardId=req.params.id
    const ScoreboardDetail=await Scoreboard.findByIdAndDelete(scoreboardId);
    return res.json(ScoreboardDetail);
}
export {
    getScoreboardHandler,
    ScoreboardDetailsHandler,
    createScoreboardHandler,
    updateScoreboardHandler,
    deleteScoreboardHandler
}
