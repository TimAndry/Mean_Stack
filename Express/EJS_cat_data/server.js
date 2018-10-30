// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
console.log("Let's find out what express is", express);


// invoke express and store the result in the variable app
var app = express();
console.log("Let's find out what app is", app);


// use app's get method and pass it the base route '/' and a callback
app.get('/', function(request, response) {
    // just for fun, take a look at the request and response objects
   console.log("The request object", request);
   console.log("The response object", response);
   // use the response object's .send() method to respond with an h1
   response.send("<h1>Hello Express</h1>");
})

app.get("/cats", function (request, response){
  response.render('cats', {});
})

app.get("/index", function(request, response){
  response.render('index', {});
})

app.get("/cats/nemo", function(request, response){
  var catdata = ['Name: Nemo', 'Color: Black', 'Age: 3'];
  response.render('details', {cats: catdata});
})

app.get("/cats/tesla", function(request, response){
  var catdata = ['Name: Tesla', 'Color: Black', 'Age: 4'];
  response.render('details', {cats: catdata});
})

app.get("/cats/poe", function(request, response){
  var catdata = ['Name: Poe', 'Color: Black', 'Age: 1'];
  response.render('details', {cats: catdata});
})
// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));
// two underscores before dirname
// try printing out __dirname using console.log to see what it is and why we use it


// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');


// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
})