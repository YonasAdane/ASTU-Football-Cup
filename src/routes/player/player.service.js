import Player from '../../models/player.js'
export async function FindAllPlayers(){
    const player=await Player.find({});
    return player;
}
export async function CreatePlayer(name,position,jerseyNumber,goals,assist){
    const player=await Player.create({
        name,
        position,
        jerseyNumber,
        goals,
        assist
    })
    return player;
}
export async function DeletePlayer(PlayerId){
    const player=await Player.deleteOne({_id:PlayerId});
    return player;
}
export async function UpdatePlayer(PlayerId,data){
    const player=await Player.updateOne({_id:PlayerId},{...data});
    return player;
}
export async function PlayerDetail(PlayerId){
    const player=await Player.findById(PlayerId);
    return player;
}
