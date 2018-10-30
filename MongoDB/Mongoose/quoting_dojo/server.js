// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request

//session
var session = require('express-session');
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

//*************************************[MONGOOSE]**************************************/

var mongoose = require('mongoose');
// Require Mongoose (to display database information)

mongoose.connect('mongodb://localhost/basic_mongoose');
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.

var QuoteSchema = new mongoose.Schema({
    name:  { type: String, required: true, minlength: 3},
    message: { type: String, required: true, minlength: 3, maxlength: 200 },
}, {timestamps: true });

mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'Quote'
var Quote = mongoose.model('Quote') // We are retrieving this Schema from our Models, named 'Quote'

// Use native promises
mongoose.Promise = global.Promise;

//***************************************************************************************/   

//****************************************[flash messages]***************************** */

const flash = require('express-flash');
app.use(flash());

//**************************************************************************************/

app.get('/', function(req, res) {
    // This is where we will retrieve the quotes from the database and include them in the view page we will be rendering.
    Quote.find({}, function(err, quotes){
        console.log(quotes);
        if(err){
            console.log(err)
            res.render('index', {err})
        }else{
        res.render('index', {'quotes': quotes});
        }
    })
})

// Add Quote Request 
app.post('/quotes', function (req, res){
    console.log("POST DATA", req.body);
    var quote = new Quote(req.body);
    quote.save(function(err){
        if(err){
            console.log("We have an error!", err);
            for(var key in err.errors){
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        }
        else {
            res.redirect('/');
        }
    });
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})

