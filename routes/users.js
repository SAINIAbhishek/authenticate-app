//users routes
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const registerUser = require('../models/register.js');
const conn = require('../config/conn');

//register router
router.post('/register', (req, res, next) => {

  let newUser = new registerUser({
    //we will get whatever is submitted in the body
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  registerUser.addUser(newUser, (err, register) => {
    if(err){
      res.json({
        success: false,
        msg: 'Failed to register the user'
      });
    } else{
      res.json({
        success: true,
        msg: 'User registered successfully'
      });
    }
  });

});

//authenticate router
router.post('/authenticate', (req, res, next) => {
  //getting the username and password that is submitted
  const username = req.body.username;
  const password = req.body.password;

  //get the user by username for this we have already created the function
  registerUser.getUserByUsername(username, (err, user) => {
    //throwing error
    if(err) throw err;

    //check for the user
    if(!user){ //no user returned
      return res.json({
        success: false,
        msg: 'User not found!'
      });//sending response to client
    }

    //user exist then check for password
    registerUser.comparePassword(password, user.password, (err, isMatch) => { //password entered by user and actual password in the database. isMatch boolean to check password matches or not
      //throwing error
      if(err) throw err;

      //test for isMatch
       if(isMatch){
         //create token
         const token = jwt.sign(user.toJSON(), conn.secret, {
           //object with options we want
           expiresIn: 604800 //one week
         });

         //response to frontend
         res.json({
           success: true,
           token: 'JWT '+token,
           user: { //building our own object
             id: user._id,
             name: user.name,
             username: user.username,
             email: user.email
           }
         });
       } else{
         //no match
         return res.json({
           success: false,
           msg: 'Check the username and password, and try again!'
         });
       }
    });
  });
});

//profile router
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({
    user: req.user
  });
});

module.exports = router;
