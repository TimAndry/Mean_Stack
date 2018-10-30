//EXPRESS
var express = require('express');
var app = express();
app.use(express.static( __dirname + '/public/dist/public' ));//Directory to Angular
var path = require('path');
//BODYPARSER
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');

//MODELS

const ReviewSchema = new mongoose.Schema({
  name: {type: String, required: [true, "Add a name to this review"], minlength: [3, "name must be at least 3 characters long"]},
  stars: {type: Number, required: [true, "Please add a rating"]},
  description: {type: String, required: [true, "Please add a short comment"], minlength: [10, "review should be at least 10 characters long"], maxlength: [2000, "This review is too long, 2000 word max"]},

}, {timestamps: true})
const RestaurantSchema = new mongoose.Schema({
  name: {type: String, required: [true, "Name must be included"], minlength: [3, "Name must be at least 3 characters long"], maxlength: [45, "This name is too long"]},
  type: {type: String, required: [true, "Type must be defined"],  minlength: [3, "Name must be at least 3 characters long"], maxlength: [45, "This name is too long"]},
  reviews: [ReviewSchema],
}, {timestamps: true})

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);
var Review = mongoose.model('Review', ReviewSchema);


// this route will be triggered if any of the routes above did not match


//SHOW ALL PETS
app.get('/getrestaurants', function (req, res) {
    console.log('trying to get all restaurants');
  Restaurant.find({}, function (err, pets) {
      if (err) {
          console.log('we have errors');
          res.json(err);
      } else {
          res.json(pets);
      }
  });
})

//GET SPECIFIC RESTAURANT
app.get('/onerestaurant/:id', function (req, res) {
  console.log('This is the restaurant im trying to find', req.params);
  Restaurant.findOne({_id: req.params.id }, function (err, restaurant) {
      if (err) {
          console.log('we have errors');
          res.json(err);
      } else {
        res.json(restaurant);
      }
  })
})

          
//CREATE A NEW PET
app.post('/create', function(req, res){
  console.log(req.body);
  restaurant = new Restaurant({name: req.body.name, type: req.body.type});
  restaurant.save(function (err){
      if(err){
          console.log('we have errors', err);
          res.json(err);
      }else{
          res.json(restaurant);
      }
  })
})

//UPDATE A RESTAURANT
app.put('/edit/:id', function(req, res){
  console.log(req.body._id);
  Restaurant.update({_id: req.body._id},  {$set: {name: req.body.name, type: req.body.type}}, function(err, restaurant){
      if(err){
          console.log('we have errors on', req.body.name);
          res.json(err);
      }else{
          console.log(restaurant);
          res.json(restaurant);
      }
  })
})

//ADD A REVIEW
app.put('/addreview/:id', function (req, res){
    console.log(req.body, 'this is the review');
    var review = new Review({name: req.body.name, stars: req.body.stars, description: req.body.description});
    review.save(function(err){
         if(err){
             console.log("We have an error!", err);
             res.json(err);
         }
         else {
             console.log('this is the new review', review)
             Restaurant.update({_id: req.body._id}, {$push: {reviews: review}}, function(err, newreview){
                 if(err){
                     console.log("We have an error!", err);
                    //  for(var key in err.errors){
                    //      req.flash('registration', err.errors[key].message);
                    //  }
                     res.json(err);
                 }
                 else {
                     console.log('success')
                     res.json(newreview);
                 }
             });
         }
     });
 });

//DELETE A RESTAURANT
app.delete('/delete/:id', function(req, res){
  Restaurant.deleteOne({_id: req.params.id}, function(err){
      if(err){
          console.log('we have errors');
          res.json(err);
      }else{
          res.json();
      }
  })
})


app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
  });

// SERVER
app.listen(8000, function () {
    console.log("listening on port 8000");
})

