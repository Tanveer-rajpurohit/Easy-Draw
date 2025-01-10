import { Router } from "express";
import isAuthorized from "../middleware/isLoggedIn";
import { createTeam, joinTeam } from "../controller/TeamController";

const teamRouter = Router();

teamRouter.post('/create',isAuthorized, createTeam)
teamRouter.post('/join',isAuthorized, joinTeam); 


export default teamRouter