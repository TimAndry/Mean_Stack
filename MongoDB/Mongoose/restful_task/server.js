//EXPRESS
var express = require('express');
var app = express();

//BODYPARSER
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');

//MODELS

const TaskSchema = new mongoose.Schema(
    {
        task: {type: String},
        description: {type: String},
        completed: {type: Boolean},
    },
    { timestamps: true }
)
var Task = mongoose.model('Task', TaskSchema);


//ROUTES(for now)

//SHOW ALL TASKS
app.get('/', function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            console.log('we have errors');
        } else {
            res.json(tasks);
        }
    });
})

//GET SPECIFIC TASK
app.get('/:id', function (req, res) {
    Task.findOne({_id: req.params.id }, function (err, task) {
        if (err) {
            console.log('we have errors');
        } else {
            res.json(task);
        }
    });
})

//CREATE A NEW TASK
app.post('/create', function(req, res){
    task = new Task(req.body);
    task.save(function (err){
        if(err){
            console.log('we have errors');
        }else{
            console.log(task);
            res.redirect('/');
        }
    })
})

//UPDATE A TASK
app.put('/update/:id', function(req, res){
    Task.update({_id: req.params.id},  {$set: {task: req.body.task, description: req.body.description, completed: req.body.completed}}, function(err, task){
        if(err){
            console.log('we have errors');
        }else{
            console.log(task);
            res.redirect('/');
        }
    })
})

//DELETE A TASK
app.delete('/delete/:id', function(req, res){
    Task.deleteOne({_id: req.params.id}, function(err){
        if(err){
            console.log('we have errors');
        }else{
            res.redirect('/');
        }
    })
})


//ROUTES(later)
//require('./server/config/routes.js')(app)

// SERVER
app.listen(8000, function () {
    console.log("listening on port 8000");
})