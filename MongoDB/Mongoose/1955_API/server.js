//EXPRESS
var express = require('express');
var app = express();

//BODYPARSER
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');

//MODELS

const NameSchema = new mongoose.Schema(
    {
        name: { type: String, required: true}
    },
    { timestamps: true }
)
var Name = mongoose.model('Name', NameSchema);




//ROUTES(for now)
app.get('/', function(req,res){
    Name.find({}, function (err, names) {
        if(err){
            console.log('we have errors');
        }else{
            res.json(names);
        }
    });
})

app.get('/new/:name', function(req, res){
    var person = new Name({name: req.params.name});
    console.log(person);
    person.save(function(err){
        if(err){
            console.log('we have errors');
        }else{
            res.json(person);
        }
    })
})

app.get('/remove/:name', function(req, res){
    Name.remove({name: req.params.name}, function(err){
        if(err){
            console.log('we have errors');
        }else{
            res.redirect('/');
        }
    })
})

app.get('/:name', function(req, res){
    Name.find({name: req.params.name}, function(err, person){
        if(err){
            console.log( 'we have errors');
        }else{
            res.json(person);
        }
    })
})


//ROUTES(later)
//require('./server/config/routes.js')(app)

// SERVER
app.listen(8000, function () {
    console.log("listening on port 8000");
})