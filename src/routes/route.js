import express from 'express'
import { getClubsHandler,clubsDetailsHandler,createClubHandler,updateClubHandler,deleteClubHandler} from './club/club.controller.js';
import { createMatchesHandler, deleteMatchesHandler,addCardHandler, getMatchesHandler, matchesDetailsHandler, addGoalMatchesHandler, updateMatchesHandler } from './matches/matches.controller.js';
import { createScheduleHandler, deleteScheduleHandler, getScheduleHandler, ScheduleDetailsHandler, updateScheduleHandler } from './schedule/schedule.controller.js';
import { createPlayerHandler, deletePlayerHandler, getPlayerHandler, playerDetailsHandler, updatePlayerHandler } from './player/player.controller.js';
import { loginHandler, logoutHandler, registerHandler } from './auth/auth.controller.js';
import { validateData } from '../middleware/validation.middleware.js';
import { createClubSchema, updateClubScheme } from './club/club.schema.js';
import { addCardSchema, addGoalMatchSchema, createMatchSchema, updateMatchSchema } from './matches/matches.schema.js';
import { createPlayerSchema, updatePlayerSchema } from './player/player.schema.js';
import multer from 'multer';
const storage = multer.memoryStorage(); 
const upload = multer({ storage }); 

const app=express.Router();
app.use(express.json());
 
app.post("/login",loginHandler);
app.post("/register",registerHandler)
app.get("/logout",logoutHandler)

app.get('/clubs',getClubsHandler);
app.get('/clubs/:id',clubsDetailsHandler);
// validateData(createClubSchema) createClubHandler
app.post('/clubs', upload.single('logo'),createClubHandler
    // upload.single('logo'),(req,res)=>{
    // const body= req.body; 
    // console.log(req.file);
    // return res.json(req.file) 
// }
)
app.patch('/clubs/:id',validateData(updateClubScheme),updateClubHandler)
app.delete('/clubs/:id',deleteClubHandler)

app.get('/matches',getMatchesHandler)
app.get('/matches/:id',matchesDetailsHandler)
app.post('/matches',validateData(createMatchSchema),createMatchesHandler)
app.patch('/matches/:id',validateData(updateMatchSchema),updateMatchesHandler)
app.post('/matches/:id/addGoals',validateData(addGoalMatchSchema),addGoalMatchesHandler)
app.delete('/matches/:id',deleteMatchesHandler)
app.post('/matches/:id/addCard',validateData(addCardSchema),addCardHandler)

app.get('/schedules',getScheduleHandler)
app.get('/schedules/:id',ScheduleDetailsHandler)
app.post('/schedules',createScheduleHandler)
app.patch('/schedules/:id',updateScheduleHandler)
app.delete('/schedules/:id',deleteScheduleHandler)

app.get('/player',getPlayerHandler);
app.get('/player/:id',playerDetailsHandler);
app.post('/player',validateData(createPlayerSchema),createPlayerHandler)
app.patch('/player/:id',validateData(updatePlayerSchema),updatePlayerHandler)
app.delete('/player/:id',deletePlayerHandler)

export {app as routes}; 