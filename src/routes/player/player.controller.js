import cloudinary from "../../utils/cloudinary.js";
import { DeletePlayer,PlayerDetail,CreatePlayer, FindAllPlayers, UpdatePlayer } from "./player.service.js"

async function getPlayerHandler(req,res){
const players=await FindAllPlayers();
return res.json(players)
}
async function createPlayerHandler(req,res){
    const {name,positon,jerseynumber,goals,assist,avatar}=req.body;
    const uploadResult = await cloudinary.uploader
       .upload(
        avatar,
         {
               folder:"ASTU-sport/playerAvatar"
           }
       )
    const player=await CreatePlayer(name,positon,jerseynumber,goals,assist,uploadResult.publicId,uploadResult.logoUrl);
    return res.json(player); 
}  
async function updatePlayerHandler(req,res){
    const playerId=req.params.id;
    const data=req.body;
    const player= UpdatePlayer(playerId,data);
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
