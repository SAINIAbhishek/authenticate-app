const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const conn = require('../config/conn');

//now we will crete the schema for the user registration and define the attributes we want
const userRegisterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const user = module.exports = mongoose.model('user', userRegisterSchema);

//when we want to use function outside
module.exports.getUserById = function(id, callback){
  user.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {
    username: username
  }
  user.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

//function comparePassword
module.exports.comparePassword = function(enteredPassword, hashPassword, callback){
  bcrypt.compare(enteredPassword, hashPassword, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch); 
  });
}
