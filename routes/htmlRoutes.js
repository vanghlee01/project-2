var mysql = require("mysql");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var authenticateController = require("../controllers/authenticate-controller");
var registerController = require("../controllers/register-controller");
var surveycontroller = require("../controllers/survey-controller");
var profileController = require("../controllers/profile-controller");
var con = require("../config/config");

module.exports = function(app) {
  app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true
    })
  );
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.get("/controllers/main", function(req, res) {
    res.render("example", { username: req.username });

    // eslint-disable-next-line no-undef
    console.log(req.body.user + "cheking login");
  });

  //ATTENTION!!!!!!=====================================
  //grabs the destination data to bring into the API call.
  app.get("/api/getDestination", function(req, res) {
    con.query("SELECT destination FROM survey", function(err, result) {
      if (err) throw err;
      res.json({
        status: true,
        data: result,
        message: "user registered successfuly"
      });
    });
  });
  //ATTENTION!!!!!!=====================================

  app.get("/", function(req, res) {
    res.render("auth", { title: "Home", userData: req.user });

    console.log(req.user);
  });

  app.get("/profile", function(req, res) {
    res.render("profile", { title: "survey", userData: req.user });

    console.log(req.user + "before survay");
  });

  app.get("/surveyplan", function(req, res) {
    res.render("surveyplan", { title: "Home", userData: req.user });

    console.log(req.user + "before survay");
  });

  console.log(authenticateController);

  app.post(
    "/controllers/authenticate-controller",
    authenticateController.authenticate
  );
  app.post("/controllers/register-controller", registerController.register);
  app.post("/controllers/profile-controller", profileController.profile);
  app.post("/controllers/survey-controller", surveycontroller.survey);
};
