import Schedule from "../../models/schedule.js"

//Retrieves a list of all scheduled matches.
async function getScheduleHandler(req,res){
    const data=await Schedule.find({});
    return res.json(data)
}
//Creates a new schedule for a match.
async function createScheduleHandler(req,res){
    const {matchId,beginDate,endDate,venue}=req.body;
    const NewSchedule=await Schedule.create({
        data:{
            matches:matchId,
            date:{
                begin:beginDate,
                end:endDate
            },
            venue:venue
        }
    })
    return res.json(NewSchedule);
}
//Updates an existing schedule (e.g. change date/venue).
async function updateScheduleHandler(req,res){
    const {scheduleId,matchId,beginDate,endDate,venue}=req.body;
    const NewSchedule=await Schedule.findByIdAndUpdate({
        id:scheduleId,
        data:{
            matches:matchId,
            date:{
                begin:beginDate,
                end:endDate
            },
            venue:venue
        }
    })
    return res.json(NewSchedule);
}

async function ScheduleDetailsHandler(req,res){
    const scheduleId=req.params.id
    const ScheduleDetail=await Schedule.findById(scheduleId);
    return res.json(ScheduleDetail);
}
//Deletes a schedule by ID.
async function deleteScheduleHandler(req,res){
    const scheduleId=req.params.id
    const ScheduleDetail=await Schedule.findByIdAndDelete(scheduleId);
    return res.json(ScheduleDetail);
}
export {
    getScheduleHandler,
    ScheduleDetailsHandler,
    createScheduleHandler,
    updateScheduleHandler,
    deleteScheduleHandler
}
