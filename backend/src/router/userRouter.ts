import { Router } from "express";
import { getDashboardData } from "../controller/userController";
import isAuthorized from "../middleware/isLoggedIn";

const userRouter = Router();

userRouter.get('/dashboard',isAuthorized,getDashboardData)

export default userRouter