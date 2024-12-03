import { uploadToCloudinary } from "../../utils/uploadToCloud.js";
import { ClubDetail, CreateClub, DeleteClub, FindAllClubs } from "./club.service.js"

async function createClubHandler(req, res) {
    try {
        const { name, coach,abbreviation } = req.body;
        console.log("req body: ",req.body);
        // Ensure a file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        // Upload file buffer to Cloudinary
        const uploadResult = await uploadToCloudinary(req.file.buffer,"club-logo");

        // Create the club with the uploaded image details
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
export {
    getClubsHandler,
    clubsDetailsHandler,
    createClubHandler,
    updateClubHandler,
    deleteClubHandler
}
