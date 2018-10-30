const mongoose = require('mongoose');
require('../models/user.js');
User = mongoose.model('User');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');


module.exports = {
    logUser: function(req, res){
        console.log(req.body.email);
        User.find({ email: req.body.email }, function (err, auser) {
            bcrypt.compare(req.body.password, auser[0].password, function (err, result) {
                if (result == true) {
                    req.session.id = auser[0].id;
                    console.log(req.session.id)
                    res.redirect('/user/' + req.session.id);
                }
                else {
                    req.flash('registration', 'this user/password combination does not match any records');
                    res.redirect('/');
                }
            });
        });
    }
}