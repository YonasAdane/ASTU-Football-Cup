import { BaseError } from "../../error/customError.js";
import Club from "../../models/club.js";
import Player from "../../models/player.js";
import { uploadToCloudinary } from "../../utils/uploadToCloud.js";
import { ClubDetail, CreateClub, DeleteClub, FindAllClubs } from "./club.service.js"

async function createClubHandler(req, res) {
    console.log("requesting file: ",req.file);
    try {
        const { name, coach,abbreviation } = req.body;
        console.log("req body: ",req.body);
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const uploadResult = await uploadToCloudinary(req.file.buffer,"club-logo");

        const club = await CreateClub(name,abbreviation, coach, uploadResult.public_id, uploadResult.secure_url);

        return res.json(club);
    } catch (error) {
        console.error("Error creating club:", error);
        return res.status(500).json({ message: "An error occurred while creating the club.", error });
    }
}
async function getClubsHandler(req,res){
   const clubs=await  FindAllClubs();
   return res.json(clubs);
}
//Retrieves details of a specific club by ID.
async function clubsDetailsHandler(req,res){
    const clubId=req.params.id;
    const club=await ClubDetail(clubId);
    return res.json(club)
}


async function updateClubHandler(req,res){
    const data=req.body;
    const clubId=req.params.id;
    if (req.file) {
        const uploadResult = await uploadToCloudinary(req.file.buffer,"club-logo");
        data.logo.public_id=uploadResult.public_id;
        data.logo.url=uploadResult.secure_url;
    }
    const club=await UpdateClub(clubId,data);
    return res.json(club);
}
async function deleteClubHandler(req,res){
    const ClubId=req.params.id;
    console.log(ClubId);
    const club=await DeleteClub(ClubId)
    return res.json(club);    
}
async function addPlayerClubHandler(req,res){
        const { clubId, playerId } = req.params;
      
          const [club, player] = await Promise.all([
            Club.findById(clubId),
            Player.findById(playerId),
          ]);
          
          if (!club) throw new BaseError("Club not found",404)
          if (!player) throw new BaseError("Player not found",404)
          if (player.club?.toString() === clubId) throw new BaseError("Player is already assigned to this club",400) 
      
            player.club = clubId;
            await player.save();
      
            if (!club.players.includes(playerId)) {
              club.players.push(playerId);
              await club.save();
            }
      
            res.status(200).json({
              message: 'Player successfully assigned to the club',
              club,
              player,
            });
          
}
async function removePlayerClubHandler(req,res){
    const { clubId, playerId } = req.params;
      
          const [club, player] = await Promise.all([
            Club.findById(clubId),
            Player.findById(playerId),
          ]);
          
          if (!club) throw new BaseError("Club not found",404)
          if (!player) throw new BaseError("Player not found",404)
          if (player.club?.toString() !== clubId) throw new BaseError("Player does not belong to this club",400) 
      
            player.club = null;
            await player.save();
      
            if (club.players.includes(playerId)) {
                club.players = club.players.filter((id) => id.toString() !== playerId);
              await club.save();
            }
      
            res.status(200).json({
                message: 'Player successfully removed from the club',
                club,
                player,
              });
}

export {
    getClubsHandler,
    clubsDetailsHandler,
    createClubHandler,
    updateClubHandler,
    deleteClubHandler,
    addPlayerClubHandler,
    removePlayerClubHandler,
}
