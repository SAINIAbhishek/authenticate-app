const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const registeredUser = require('../models/register.js');
const conn = require('../config/conn');

module.exports = function(passport){
  let options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  options.secretOrKey = conn.secret;
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    registeredUser.getUserById(jwt_payload._id, (err, user) => {
      if(err){
        return done(err, false);
      }
      //checking for user
      if(user){
        return done(null, user); //null for the error
      } else{
        return done(null, false);
      }
    });
  }));
}
