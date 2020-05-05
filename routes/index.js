var express = require('express');
var router = express.Router();
const Goal = require("../models/Goal");
const Step = require("../models/Step");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Root Page");
});

/* Debugging Commands */
//Initialize Goals
router.get("/goalInitialize", (req, res, next) => {
  const initializeGoalSchema = new Goal({
    goalName: "Initialize",
    steps: [],
    status: "Initialize",
    startDate: "Initialize",
    goalColor: "Initialize",
  });
  initializeGoalSchema.save((err) => {
    if (err) {return next(err);}
    console.log("Goals initialized");
    res.redirect("/");
  });
});

router.get("/stepInitialize", (req, res, next) => {
  const intializeStepSchema = new Step({
    stepName: "init",
    isComplete: true,
    tasks: [],
  });
  intializeStepSchema.save((err) => {
    if (err) {return next(err);}
    console.log("Steps initialized");
    res.redirect("/");
  });
});


module.exports = router;