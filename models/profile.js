const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{type:String},
    profile_picture:{type:String},
    website: {
        type: String
    },
    email: {
      type: String
    },
    phone: {
      type: String
    },
    skills: {
        type: [String],
        
    },
    bio: {
        type: String
    },
    education: [
      {
        school: {
          type: String,
          required: true
        }
      }
    ],
    subjects: [
     
      {
        subjectname:{
          type:String,
          required:true
        },
        subjectdescripition:{
          type:String,
          required:true
        },
        subjectyear:{
          type:Number,
          required:true
        }


      }
    ]
});
var profile = mongoose.model('profile', ProfileSchema);