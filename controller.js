var mongoose = require('mongoose');
var User = mongoose.model('users');
var express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const bcrypt = require("bcryptjs");

var createUser = function(req, res) {

    var user = new User({
        "name":req.body.name,
        "email":req.body.email,
        "password":req.body.password
    });

    User.findOne({email:user.email}, function(err, user1) {
        if (user1) {
            console.log("ccccc");
     
            
        } else {
            console.log(user1);
            user.save(function (err, newUser) {
                if (!err) {
                    console.log("rehistered");
                } else {
                    res.sendStatus(400);
                }
            });
        }
    });
};

// Find all users
var findAllUsers = function(req, res) {
    User.find(function(err, users) {
        if (!err) {
            res.send(users);
        } else {
            res.sendStatus(404);
        }
    });
};

// Find one user by id
var findOneUser = function(req, res) {
    var userInx = req.params.id;
    User.findById(userInx, function(err, user) {
        if (!err) {
            res.send(user);
        } else {
            res.sendStatus(404);
        }
    });
};

//Find one user by name
var findUserByName = function(req, res) {
    var userName = req.params.name;
    console.log(userName);
    User.findOne({name:userName}, function(err, user) {
        if (!err) {
            console.log("errrr")
            res.send(user);
        } else {
            res.sendStatus(404);
            console.log("errrr1")
        }
    });
};





//Delete user by id
var deleteUserById = function(req, res) {
    var userId = req.query.id;
    User.findByIdAndRemove(userId, function(err, user) {
        if (!err) {
            res.send("delete user");
        } else {
            res.status(404).send(err);
        }
   });
};

var loginUser = function(req, res) {
    const { email, password } = req.body;
    
    //check for existing user
    User.findOne({ email }).then((user) => {
      if (!user) return res.status(400).json("Incorrect Email or Password");

      // Validate password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) return res.status(400).json("Incorrect Email or Password");
        console.log("dddd");
        const sessUser = { id: user.id, name: user.name, email: user.email };
        req.session.user = sessUser; // Auto saves session data in mongo store

        res.json(sessUser); // sends cookie with sessionID automatically in response
      });
    });
  
};
module.exports.loginUser =loginUser;
module.exports.createUser = createUser;
module.exports.findAllUsers = findAllUsers;
module.exports.findOneUser = findOneUser;
module.exports.findUserByName = findUserByName;
module.exports.deleteUserById = deleteUserById;