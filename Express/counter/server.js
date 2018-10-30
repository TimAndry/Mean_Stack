var express = require("express");
var session = require('express-session');
var app = express();
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.get('/', function(request, response) {
   console.log("The request object", request);
   console.log("The response object", response);
   response.send("<h1>Hello Express</h1>");
})

app.get('/counter', function(request, response){
    if(request.session.number == undefined){
        request.session.number = 0
    }else{
        request.session.number += 1;
    }
    number = request.session.number
    response.render("counter", {number: number})
})

app.get('/addone', function(request, response){
    request.session.number += 1;
    console.log(request.session.number);
    response.redirect("/counter")
})

app.get('/reset', function(request, response){
    request.session.destroy();
    response.redirect("/counter")
})

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
app.listen(8000, function() {
  console.log("listening on port 8000");
})

