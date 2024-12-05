import { BaseError } from "../../error/customError.js";
import { uploadToCloudinary, uploadToCloudinaryByLink } from "../../utils/uploadToCloud.js";
import { DeletePlayer,PlayerDetail,CreatePlayer, FindAllPlayers, UpdatePlayer } from "./player.service.js"

async function getPlayerHandler(req,res){
const players=await FindAllPlayers();
return res.json(players)
}
async function createPlayerHandler(req,res){
    const {name,position,jerseyNumber,goals,assist}=req.body;
    console.log(req.body.avatar);
    if(req.body.avatar){
        const uploadResult = await uploadToCloudinaryByLink(req.body.avatar,"playerAvatar");
        const player=await CreatePlayer(name,position,jerseyNumber,goals,assist,uploadResult.public_id,uploadResult.url);
        return res.json(player); 
    }
    else if(req.file.buffer){
        const uploadResult = await uploadToCloudinary(req.file.buffer,"playerAvatar");
        const player=await CreatePlayer(name,position,jerseyNumber,goals,assist,uploadResult.public_id,uploadResult.url);
        return res.json(player); 
    }
    else{
         throw new BaseError("Image is not Uploaded",400);
    }
   
}  
async function updatePlayerHandler(req,res){
    const playerId=req.params.id;
    const data=req.body;
    if (req.file) {
        const uploadResult = await uploadToCloudinary(req.file.buffer,"playerAvatar");
        data.logo.public_id=uploadResult.public_id;
        data.logo.url=uploadResult.secure_url;
    }
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
