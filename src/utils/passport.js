import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.js";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt"
const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET
export default passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/api/v1/auth/google/callback",
    scope:["profile","email"]
  },
  async function(accessToken, refreshToken, profile, done) {
    let user;
    try {
      user=await User.findOne({googleId:profile.id});
      if(!user){
        user=new User({
          googleId:profile.id,
          email:profile.emails[0].value,
          username:profile.displayName,
          avatar:profile.photos[0].value
        })
       const savedUser= await user.save();
       return done(null,savedUser)
      }
      return done(null,user)
    } catch (error) {
      return done(error,false)
    }
  }
));
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email })
      .then(user => {
      if (!user) {
          return done(null, false, { message: 'That email is not registered' });
      }

      bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) { return done(err); }
          if (isMatch) { 
            return done(null, user);
          } 
          else {
            return done(null, false, { message: 'Incorrect password' });
          }
      });
      })
      .catch(err => done(err));
  })
);
passport.serializeUser((user,done)=>{
  return done(null,user.id)
});
passport.deserializeUser(async (id,done)=>{
  try {
    const findUser=await User.findById(id);
    return findUser? done(null,findUser) : done(null,null)
  } catch (error) {
    return done(error,null)
  }
});