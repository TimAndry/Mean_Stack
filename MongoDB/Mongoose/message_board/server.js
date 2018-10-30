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

mongoose.connect('mongodb://localhost/basic_mongoose');

const CommentSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Name must be included"]},
    comment: {type: String, required: [true, "Comment must have content"]},
  }, {timestamps: true})
const MessageSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Name must be included"], minlength: [3, "Titles must have at least 3 characters"]},
    message: {type: String, required: [true, "Message must have content"]},
    comments: [CommentSchema]
  }, {timestamps: true})

var Message = mongoose.model('Message', MessageSchema);
var Comment = mongoose.model('Comment', CommentSchema);

mongoose.Promise = global.Promise;

//***************************************************************************************/   

//****************************************[FLASH MESSAGES]***************************** */

const flash = require('express-flash');
app.use(flash());

//**************************************************************************************/

app.get('/', function(req, res) {
    // This is where we will retrieve the quotes from the database and include them in the view page we will be rendering.
    Message.find({}, function(err, allmessages){
        if(err){
            console.log(err)
            res.render('index', {err})
        }else{
        res.render('index', {'allmessages': allmessages});
        }
    });
});

// Add Quote Request 
app.post('/message', function (req, res){
    console.log("POST DATA", req.body);
    var message = new Message(req.body);
    message.save(function(err){
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

app.post('/comment/:id', function (req, res){
   var comment = new Comment(req.body);
   comment.save(function(err){
        if(err){
            console.log("We have an error!", err);
            for(var key in err.errors){
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        }
        else {
            Message.update({_id: req.params.id}, {$push: {comments: comment}}, function(err, newcomment){
                if(err){
                    console.log("We have an error!", err);
                    for(var key in err.errors){
                        req.flash('registration', err.errors[key].message);
                    }
                    res.redirect('/');
                }
                else {
                    console.log('success')
                    res.redirect('/');
                }
            });
        }
    });
});
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})

