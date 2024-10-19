import { createMatch, FindAllMatches, MatchDetail, UpdateMatch } from "./matches.service.js"

//Retrieves a list of all matches, along with their status and scores.
async function getMatchesHandler(req,res){
    const matches=await FindAllMatches();
    return res.json(matches);
}
//Retrieves details of a specific match, including goals and status.
async function matchesDetailsHandler(req,res){
    const MatchId=req.params.id;
    const match=await MatchDetail(MatchId);
    return res.json(match);
}
//Creates a new match between two clubs.
async function createMatchesHandler(req,res){
    const {clubOneId, clubTwoId, date}=req.body;
    console.log(req.body); 
    const match=await createMatch(clubOneId, clubTwoId, date)
    return res.json(match)
}
//Updates match details (score, status, etc.).
async function updateMatchesHandler(req,res){
    const matchId=req.params.id;
    const updateData=req.body;
    const match=await UpdateMatch(matchId,updateData);
    return res.json(match);
}   
//Reports a goal for a specific match.
async function addGoalMatchesHandler(req,res){
    const matchId=req.params.id;
    const {clubId,playerId,assistId,time}=req.body;
    const match=await addGoal(matchId, clubId, playerId, assistId, time);
    return res.json(match);
}
//Deletes a match by ID.
async function deleteMatchesHandler(req,res){
  const matchId=req.params.id;
  const match=await DeleteMatch(matchId)
  return res.josn(match);
}
async function addCardHandler(req,res){
    const matchId=req.params.id;
    const {clubId, playerId, color, time}=req.body;
    const match=await addCard(matchId, clubId, playerId, color, time)
    return res.json(match);
}
export {
    addCardHandler,
    getMatchesHandler,
    matchesDetailsHandler,
    createMatchesHandler,
    updateMatchesHandler,
    deleteMatchesHandler,
    addGoalMatchesHandler
}
