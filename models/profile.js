const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
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
    
    date: {
      type: Date,
      default: Date.now
    }
});
var profile = mongoose.model('profile', ProfileSchema);