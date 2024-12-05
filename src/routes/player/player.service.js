import Player from '../../models/player.js'
import { deleteFromCloudinary } from '../../utils/uploadToCloud.js';
export async function FindAllPlayers(){
    const player=await Player.find({});
    return player;
}
export async function CreatePlayer(name,position,jerseyNumber,goals,assist,publicId,avatarUrl){
    const player=await Player.create({
        name,
        position,
        jerseyNumber,
        goals,
        assist,
        avatar:{
            public_id:publicId,
            url:avatarUrl
          }
    })
    return player;
}
export async function DeletePlayer(PlayerId){
    const player=await Player.deleteOne({_id:PlayerId});
    await deleteFromCloudinary(player.avatar.public_id)
    return player;
}
export async function UpdatePlayer(PlayerId,data){
    try {
        const player = await Player.findByIdAndUpdate(
            PlayerId, 
          { $set: data }, 
          { new: true } 
        );
    
        if (!player) {
          console.log("Player not found");
          return null;
        }
    
        return player;
      } catch (error) {
        throw error;
      }
}
export async function PlayerDetail(PlayerId){
    const player=await Player.findById(PlayerId);
    return player;
}
