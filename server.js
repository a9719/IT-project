var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

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
require('./models/edu.js');
var routes = require('./routes/router.js');

app.use('/', routes);

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})