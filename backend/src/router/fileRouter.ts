import { Router } from "express";
import { createFile, deleteFile, editFile, getalldata } from "../controller/fileController";
import isAuthorized from "../middleware/isLoggedIn";

const fileRouter = Router();

fileRouter.post('/create',isAuthorized,createFile)
fileRouter.post('/edit',isAuthorized,editFile)
fileRouter.delete('/delete',isAuthorized,deleteFile)
fileRouter.get('/alldata',isAuthorized, getalldata)

export default fileRouter