import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET
export default passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/api/v1/auth/google/callback",
    scope:["profile"]
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
  }
));