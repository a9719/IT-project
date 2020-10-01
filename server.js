var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
const passport = require ('passport')
const config = require('./passport.js')

var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(passport.initialize());

const mongoURI = "mongodb+srv://Aneesh97:Mufcwazza1997@clusteraneesh.puusf.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(
    mongoURI,
    { useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: "It_project" }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

require('./models/user.js');
require('./models/profile.js');

const routes = require('./routes/router.js');
const fileRoutes = require('./routes/file-upload.js');
const auth = require('./auth.js');

app.use('/', routes);
app.use('/', fileRoutes);
app.use('/auth', auth);

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})