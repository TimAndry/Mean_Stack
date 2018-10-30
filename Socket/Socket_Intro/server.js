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
    response.redirect('/');
})

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
const server = app.listen(8000);
const io = require('socket.io')(server);
var counter = 0;

io.on('connection', function (socket) { //2
    
    socket.on('form_data', function (data) { //7
      console.log(data); //8 (note: this log will be on your server's terminal)
    });
      
  });

// initially the client will request a web page from the server by connecting to our server via our port "localhost:8000". The server then sends back the index.html file as shown above. The script will run on the client's browser and connect to our server via sockets.

// This triggers our server's connection listener to run, and this occurs for every new socket connection. 

// Then the server will emit a message 'greeting' to the client, because we placed an emit event there. 

// The client's 'greeting' listener will then be triggered... 

// ...and log the data sent via the message on our browser's console. 

// Finally the client will emit a 'thank you' message to the server because we included this emit within the callback of our 'greeting' listener.

// The server's listener with the matching 'thank you' label will be triggered...

// ...and invoke its callback.