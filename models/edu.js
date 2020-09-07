const mongoose = require('mongoose');
const educationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    education: [
        {
          school: {
            type: String,
            required: true
          }
        }
      ]

})
var education = mongoose.model('education', educationSchema);