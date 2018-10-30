//EXPRESS
var express = require('express');
var app = express();

//BODYPARSER
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');

app.use(express.static( __dirname + '/public/dist/public' ));





//ROUTES




// SERVER
app.listen(8000, function () {
    console.log("listening on port 8000");
})