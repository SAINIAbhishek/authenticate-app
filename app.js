//1. this is the main server starting point, here first we bring all the modules we want to use
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const conn = require('./config/conn');

//11. connect to database
mongoose.connect(conn.database);

//12. to check we are connected to the database
mongoose.connection.on('connected', function (){
  console.log("Connected to the database:\n" + conn.database);
});

//13. display error
mongoose.connection.on('error', function (err){
  console.log("Encountered to error while connecting to the database:\n" + err);
});

//2. now we intialize our app variable with express
const app = express();

//8. creating users route file for routing
const users = require('./routes/users');

//3. now we mention the port that we want to use
const port = 3000;

//6. here, we are making it public so that any domain can access it
app.use(cors());

//10. set the static folder for the client, it will be the starting page
app.use(express.static(path.join(__dirname, 'client')));

//7. enabling body-parser. Middelware
app.use(bodyParser.json());

//14. passport Middelware
app.use(passport.initialize());
app.use(passport.session());

//15. including passport.js
require('./config/passport')(passport);

//9.
app.use('/users', users);

//5 index route
app.get('/', function (req, res){
  res.send("Invalid entry point!");
});

//any other route
app.get('*', function (req, res){
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

//4. now we listen to this passport
app.listen(port, function (){
  console.log("Server started at " + port);
});
