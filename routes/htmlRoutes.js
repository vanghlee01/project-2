var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var authenticateController=require('../controllers/authenticate-controller');
var registerController=require('../controllers/register-controller');


var app = express();
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'exampledb'
});

module.exports = function(app) {

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

  
  app.get('/controllers/main', function (req, res) {
    res.render('example', {title: 'main', userData: req.user});
    
    console.log(req.user);
    });

    app.get('/', function (req, res) {
      res.render('auth', {title: 'Home', userData: req.user});
      
      console.log(req.user);
      });
  

 
       console.log(authenticateController);
      app.post('/controllers/register-controller', registerController.register);
      app.post('/controllers/authenticate-controller', authenticateController.authenticate);
      app.post('/controllers/register-controller', registerController.register);
      app.post('/controllers/authenticate-controller', authenticateController.authenticate);
     

      app.get('/home', function(request, response) {
        if (request.session.loggedin) {
          response.send('Welcome back, ' + request.session.username + '!');
        } else {
          response.send('Please login to view this page!');
        }
        response.end();
      });
    
 
  app.get("*", function(req, res) {
    res.render("404");
  });
};
