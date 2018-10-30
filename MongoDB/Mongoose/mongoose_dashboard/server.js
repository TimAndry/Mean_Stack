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

var AnimalSchema = new mongoose.Schema({
    name:  { type: String, required: true, minlength: 3, maxlength: 45},
    species: { type: String, required: true, minlength: 2, maxlength: 45 },
    age: { type: Number, required: true, min: 0, max: 4500000000 },
}, {timestamps: true });

mongoose.model('Animal', AnimalSchema); 
var Animal = mongoose.model('Animal') 

// Use native promises
mongoose.Promise = global.Promise;

//***************************************************************************************/   

//****************************************[flash messages]***************************** */

const flash = require('express-flash');
app.use(flash());

//**************************************************************************************/

app.get('/', function(req, res) {
    // This is where we will retrieve the quotes from the database and include them in the view page we will be rendering.
    Animal.find({}, function(err, animals){
        if(err){
            res.render('index', {err})
        }else{
        res.render('index', {'animals': animals});
        }
    })
})

app.get('/new', function(req, res){
    res.render('new', {})
})



// Add animal Request 
app.post('/create', function (req, res){
    console.log("POST DATA", req.body);
    var animal = new Animal(req.body);
    animal.save(function(err){
        if(err){
            console.log("We have an error!", err);
            for(var key in err.errors){
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/new');
        }
        else {
            res.redirect('/');
        }
    });
});

//shows the animal
app.get('/show/:id', function(req, res){
    console.log(req.params)
    Animal.find({_id: req.params.id}, function(err, animal){
        console.log(animal);
        res.render('show', {'animal': animal});
    })
})



//edit animal
app.get('/edit/:id', function(req, res){
    console.log(req.params.id)
    Animal.find({_id: req.params.id}, function(err, animal){
        console.log(animal);
        res.render('edit', {'animal': animal});
    })
})

// Add Quote Request 
app.post('/update/:id', function (req, res){
    console.log(req.params);
    Animal.update({_id: req.params.id}, {$set: {name: req.body.name, species: req.body.species, age: req.body.age}}, function(err, animal){
        if(err){
            console.log("We have an error!", err);
            for(var key in err.errors){
                req.flash('registration', err.errors[key].message);
            }
            res.render('edit', {'animal': animal} );
        }
        else {
            res.redirect('/');
        }
    });
});

//delete an animal
app.post('/delete/:id', function (req, res){
    console.log(req.params)
    Animal.deleteOne({_id: req.params.id}, function(err, animals){
        res.redirect('/');
    })
})

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
