import mongoose from "mongoose";
import Club from "../../models/club.js";

export async function FindAllClubs(){
    const clubs=await Club.find({});
    return clubs;
}
export async function CreateClub(name,coach){
    const club=await Club.create({
        name,
        coach,
        // players:players.map(id=>mongoose.Types.ObjectId(id))
    })
    return club;
}
export async function DeleteClub(ClubId){
    const club=await Club.deleteOne({_id:ClubId});
    return club;
}
export async function UpdateClub(ClubId,data){
    const club=await Club.updateOne({_id:ClubId},{...data});
    return club;
}
export async function ClubDetail(ClubId){
    const clubs=await Club.findById(ClubId);
    return clubs;
}
