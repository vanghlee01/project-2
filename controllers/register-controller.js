var Cryptr = require("cryptr");
var express = require("express");
var connection = require("../config/config");
var cryptr = new Cryptr("myTotalySecretKey");

module.exports.register = function(req, res) {
  var today = new Date();
  var encryptedString = cryptr.encrypt(req.body.password);
  var accounts = {
    username: req.body.username,
    email: req.body.email,
    password: encryptedString,
    created_at: today,
    updated_at: today
  };
  connection.query("INSERT INTO accounts SET ?", accounts, function(
    error,
    results,
    fields
  ) {
    if (error) {
      res.json({
        status: false,
        message: "there are some error with query"
      });
    } else {
      res.json({
        status: true,
        data: results,
        message: "user registered sucessfully"
      });
    }
  });
};
