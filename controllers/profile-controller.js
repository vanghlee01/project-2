
var mysql = require('mysql');
var http = require('http');
var fs=require('fs');


var con = require("../config/config");

module.exports.profile = function(req, res) {
  var username = req.body.username;

    con.query("SELECT * FROM survey WHERE username = username", function (err, result) {
      if (err) throw err;
      console.log(result);
  
        res.render('profile')
  
      console.log(username);
    
      
    });
    
  
// }
// var mysql = require('mysql');
// var http = require('http');
// var fs=require('fs');
// var app = require('express');

// var con = require("../config/config");

// module.exports.profile = function(app) {
//   // var username = req.body.username;
//   app.get("/example/:user", function(req, res) {
//     var username = req.params.user;
    
//     con.query(`SELECT * FROM survey WHERE username = '${username}'`, function (err, result) {
//       if (err) throw err;
//       console.log(result);
  
//         res.render('profile', { username: result })
  
//       console.log(username);
    
      
//     });
//   });
  
}