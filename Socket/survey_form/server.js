var express = require("express");
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(request, response) {
   response.render('index', {});
})

app.post('/submit', function(request, response){
  //console.log("POST DATA \n\n", request.body)
  response.redirect('/');
})

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
const server = app.listen(8000);
const io = require('socket.io')(server);
var counter = 0;

io.on('connection', function (socket) { //2

    socket.on('posting_form', function (data) { //7
      var name = data.name;
      var location = data.location;
      var language = data.language;
      var message = data.message;
      console.log(message);
      var number = Math.floor(Math.random()* 1000);
      socket.emit('random_number', {num: 'The random number is ' + number})
      socket.emit('user_data', {user_name: 'Name: ' + name, user_location: 'Location: ' + location, user_language: 'Language: ' + language, user_message: 'Message: ' + message})
    });
      
  });