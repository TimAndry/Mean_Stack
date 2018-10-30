var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');

//MODELS
module.exports = function (app) {
    const UserSchema = new mongoose.Schema(
        {
            fname: { type: String, required: [true, "first name must be included"], minlength: 3, maxlength: 45 },
            lname: { type: String, required: [true, "first name must be included"], minlength: 3, maxlength: 45 },
            email: { type: String, required: [true, "email must be included"], minlength: 3, maxlength: 45 },
            bdate: { type: String, required: [true, "birthday must be included"], minlength: 3, maxlength: 45 },
            password: { type: String, required: [true, "password must be included"], minlength: 6, maxlength: 90 },
        },
        { timestamps: true }
    )
    
    // UserSchema.path('email').validate(function (email) {
    //     var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    //     return emailRegex.test(email.text);
    //  }, 'Must use a valid email.')
    
    var User = mongoose.model('User', UserSchema);
}