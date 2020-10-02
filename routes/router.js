var express = require('express');
var router = express.Router();
var controller = require('../controller.js');



router.post('/register', controller.createUser);
router.post('/login', controller.loginUser);
router.get('/profile1/:user',controller.getProfile);
router.put('/profilebio/:user',controller.addBio);
router.put('/profileskills/:user',controller.addSkills);
router.put('/profileedu/:user',controller.addEducation);
router.put('/profilesub/:user',controller.addSubjects);
router.put('/findanddeletsub/:user',controller.findSubjectsAndDelete);
router.put('/addprofilepic/:user',controller.addProfilePicture);
router.put('/addtranscript/:user',controller.addTranscript);
router.put('/addtogallery/:user',controller.addGallery);
router.put('/deletefromgallery/:user', controller.findGalleryPicAndDelete);

// Find all users
router.get('/users', controller.findAllUsers);
 
// Find one user by id
router.get('/users/id/:id', controller.findOneUser);
 
//Find one user by name
router.get('/users/name/:name', controller.findUserByName);
module.exports = router;