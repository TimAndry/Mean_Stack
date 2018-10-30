//CONTROLLERS
const register = require('../controllers/register.js')
const login = require('../controllers/login.js')


//ROUTES
module.exports = function(app){


    app.get('/', function (req, res) {
        res.render('index', {})
    })
    
    app.post('/register', function (req, res) {
        register.addUser(req, res);
    })
    
    app.post('/login', function (req, res) {
        login.logUser(req, res);
    });
    
    app.get('/user/:id', function (req, res){
        res.render('user', {});
    })

//END OF ROUTES
}