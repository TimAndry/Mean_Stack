const mongoose = require('mongoose');
require('../models/user.js');
User = mongoose.model('User');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');



module.exports = {
    addUser: function(req, res){
        if (req.body.password == req.body.password2) {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                var user = new User(req.body);
                user.password = hash;
                User.find({ email: req.body.email }, function (err, someone) {
                    if (someone.length > 0) {
                        req.flash('registration', 'this email is already registered');
                        res.redirect('/');
                    } else {
                        user.save(function (err) {
                            if (err) {
                                console.log("We have an error!", err);
                                for (var key in err.errors) {
                                    req.flash('registration', err.errors[key].message);
                                }
                                res.redirect('/');
                            }
                            else {
                                req.session.id = user.id;
                                console.log(req.session.id);
                                res.redirect('/user/' + req.session.id);
                            }
                        });
                    }
                });
            })
        }
        else {
            console.log('try again...');
            req.flash('registration', 'passwords must match');
            res.redirect('/');
        }
    }
}