import { Request, Response, Router } from "express";
import passport from "passport";
import { generateToken } from "../utils/getJwtToken";

const authRouter = Router();

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email"],
  })
);

authRouter.get('/google/callback', passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/login', session: false
}), 
(req:Request, res:Response)=>{
    if(req.user){
        const user = req.user as any;
        const token = generateToken(user._id, user.email);

        res.redirect(`http://localhost:5173/login?token=${token}`);
    }else{
        res.status(401).json({ message: 'Authentication failed' });
    }
})

export default authRouter;
