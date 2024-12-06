import express from 'express'
import multer from 'multer';
import passport from '../utils/passport.js';
import { getClubsHandler,clubsDetailsHandler,createClubHandler,updateClubHandler,deleteClubHandler, addPlayerClubHandler, removePlayerClubHandler} from './club/club.controller.js';
import { createMatchesHandler, deleteMatchesHandler,addCardHandler, getMatchesHandler, matchesDetailsHandler, addGoalMatchesHandler, updateMatchesHandler } from './matches/matches.controller.js';
import { createScheduleHandler, deleteScheduleHandler, getScheduleHandler, ScheduleDetailsHandler, updateScheduleHandler } from './schedule/schedule.controller.js';
import { createPlayerHandler, deletePlayerHandler, getPlayerHandler, playerDetailsHandler, updatePlayerHandler } from './player/player.controller.js';
import { getScoreboardHandler, ScoreboardDetailsHandler, createScoreboardHandler, updateScoreboardHandler, deleteScoreboardHandler, } from './scoreboard/scoreboard.controller.js';
import { logoutHandler, registerHandler } from './auth/auth.controller.js';
import { validateData } from '../middleware/validation.middleware.js';
import { createClubSchema, updateClubScheme } from './club/club.schema.js';
import { addCardSchema, addGoalMatchSchema, createMatchSchema, updateMatchSchema } from './matches/matches.schema.js';
import { createPlayerSchema, updatePlayerSchema } from './player/player.schema.js';
import { LoginSchema, RegisterSchema } from './auth/auth.schema.js';
import swaggerUi from "swagger-ui-express"
import { swaggerDocument } from '../utils/swagger/importjson.js';
import { createScheduleSchema, updateScheduleSchema } from './schedule/schedule.schema.js';
import { createScoreboardSchema, updateScoreboardSchema } from './scoreboard/scoreboard.schema.js';
const storage = multer.memoryStorage(); 
const upload = multer({ storage }); 

const app=express.Router();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));
app.post("/login",validateData(LoginSchema),passport.authenticate("local"));
app.get("/login/failed",(req,res)=>{res.status(401).json({message:"Authentication Failed"})});
app.get("/login/success",(req,res)=>{res.status(200).json({message:"successful"})});
app.post("/register",validateData(RegisterSchema),registerHandler)
app.get("/logout",logoutHandler)
app.get("/auth/google",passport.authenticate("google"))
app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:process.env.CLIENT_URL,
    failureRedirect:"/api/v1/login/failed"
}))

app.get('/clubs',getClubsHandler);
app.get('/clubs/:id',clubsDetailsHandler);
app.post('/clubs', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'coachPhoto', maxCount:1 }]),validateData(createClubSchema),createClubHandler)
app.patch('/clubs/:id', upload.single('logo'),validateData(updateClubScheme),updateClubHandler)
app.delete('/clubs/:id',deleteClubHandler)
app.post('/clubs/:clubId/players/:playerId',addPlayerClubHandler)
app.delete('/clubs/:clubId/players/:playerId',removePlayerClubHandler)

app.get('/matches',getMatchesHandler)
app.get('/matches/:id',matchesDetailsHandler)
app.post('/matches',validateData(createMatchSchema),createMatchesHandler)
app.patch('/matches/:id',validateData(updateMatchSchema),updateMatchesHandler)
app.post('/matches/:id/addGoals',validateData(addGoalMatchSchema),addGoalMatchesHandler)
app.delete('/matches/:id',deleteMatchesHandler)
app.post('/matches/:id/addCard',validateData(addCardSchema),addCardHandler)

app.get('/schedules',getScheduleHandler)
app.get('/schedules/:id',ScheduleDetailsHandler)
app.post('/schedules',validateData(createScheduleSchema),createScheduleHandler)
app.patch('/schedules/:id',validateData(updateScheduleSchema),updateScheduleHandler)
app.delete('/schedules/:id',deleteScheduleHandler)

app.get('/scoreboard',getScoreboardHandler)
app.get('/scoreboard/:id',ScoreboardDetailsHandler)
app.post('/scoreboard',validateData(createScoreboardSchema),createScoreboardHandler)
app.patch('/scoreboard/:id',validateData(updateScoreboardSchema),updateScoreboardHandler)
app.delete('/scoreboard/:id',deleteScoreboardHandler)


app.get('/player',getPlayerHandler);
app.get('/player/:id',playerDetailsHandler);
app.post('/player', upload.single('avatar'),validateData(createPlayerSchema),createPlayerHandler)
app.patch('/player/:id', upload.single('avatar'),validateData(updatePlayerSchema),updatePlayerHandler)
app.delete('/player/:id',deletePlayerHandler)

export {app as routes}; 