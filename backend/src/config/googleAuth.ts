import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { User } from "../model/DbModel";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "http://localhost:8000/auth/google/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: (err: any, user: any) => void
    ) => {
      try {
        let user = await User.findOne({ googleId: profile.id });


        if (!user) {
          const email = profile.emails && profile.emails[0].value;
          const extractedName = email ? email.split("@")[0] : "No Name";

          user = await User.create({
            googleId: profile.id,
            name: profile.displayName || extractedName,
            email: profile.emails[0].value,
            profilePicture: profile.photos[0].value,
          });
        }

        done(null, user);
      } catch (error) {
        console.error(error);
        done(error, null);
      }
    }
  )
);
