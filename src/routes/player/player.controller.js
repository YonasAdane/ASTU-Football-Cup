import { DeletePlayer,PlayerDetail,CreatePlayer, FindAllPlayers } from "./player.service.js"

async function getPlayerHandler(req,res){
const players=await FindAllPlayers();
return res.json(players)
}
async function createPlayerHandler(req,res){
    const {name,positon,jerseynumber,goals,assist}=req.body;
    const player=await CreatePlayer(name,positon,jerseynumber,goals,assist);
    return res.json(player); 
}  
async function updatePlayerHandler(req,res){
    const playerId=req.params.id;
    const data=req.body;
    const player= updatePlayerHandler(playerId,data);
    return res.json(player);
}
async function playerDetailsHandler(req,res){
 const playerId=req.params.id;
 console.log(playerId);
 const player=await PlayerDetail(playerId);
 return res.json(player);
}
async function deletePlayerHandler(req,res){
    const playerId=req.params.id;
    const player=await DeletePlayer(playerId);
    return res.json(player)
}
export {
    getPlayerHandler,
    playerDetailsHandler,
    createPlayerHandler,
    updatePlayerHandler,
    deletePlayerHandler
}
