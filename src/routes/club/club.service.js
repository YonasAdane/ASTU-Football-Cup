import Club from "../../models/club.js";

export async function FindAllClubs(){
    const clubs=await Club.find({});
    return clubs;
}
export async function CreateClub(name,abbreviation,description,coach,coach_publicId,coachUrl,publicId,logoUrl){
    const club=await Club.create({
        name,
        abbreviation,
        description,
        coach,
        coachPhoto:{
            public_id:coach_publicId,
            url:coachUrl
          },
        logo:{
            public_id:publicId,
            url:logoUrl
          }
    })
    return club;
}
export async function DeleteClub(ClubId){
    const club=await Club.deleteOne({_id:ClubId});
    return club;
}
export async function UpdateClub(ClubId,data){
    const club=await Club.findByIdAndUpdate(
        ClubId, 
        { $set: data }, 
        { new: true } 
      );
    return club;
}
export async function ClubDetail(ClubId){
    const clubs=await Club.findById(ClubId).populate('players');
    return clubs;
}
