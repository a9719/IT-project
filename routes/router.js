var express = require('express');
var router = express.Router();
var controller = require('../controller.js');



router.post('/register', controller.createUser);
router.post('/login', controller.loginUser);

// Find all users
router.get('/users', controller.findAllUsers);
 
// Find one user by id
router.get('/users/id/:id', controller.findOneUser);
 
//Find one user by name
router.get('/users/name/:name', controller.findUserByName);
module.exports = router;