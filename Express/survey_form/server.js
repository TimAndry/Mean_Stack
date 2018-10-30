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
  console.log("POST DATA \n\n", request.body)
  response.redirect('/results')
})

app.get('/results', function(request, response){
  response.render('results', {})
})


app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
app.listen(8000, function() {
  console.log("listening on port 8000");
})

