//EXPRESS
var express = require('express');
var app = express();

//BODYPARSER
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//PATH
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//SESSION
var session = require('express-session');
app.use(session({
    secret: 'Dontlookatme',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

//MONGOOSE
var mongoose = require('mongoose');
require('./server/models/user.js')(app)
mongoose.Promise = global.Promise;

//FLASH
const flash = require('express-flash');
app.use(flash());

//BCRYPT
const bcrypt = require('bcryptjs');


//ROUTES
require('./server/config/routes.js')(app)



//*********************************[SERVER]*************************************//

app.listen(8000, function () {
    console.log("listening on port 8000");
})

//******************************************************************************//