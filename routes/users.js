var express = require('express');
var router = express.Router();
const Jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = require("../config/TokenVerification");
//Goals Controllers
const { 
  addGoal, 
  deleteGoal, 
  setGoalAsCompleted, 
  renameGoal,
} = require("../controllers/goalsController");
//Steps Controller
const { 
  addStep, 
  setStepAsCompleted, 
  deleteStep, 
} = require("../controllers/stepsController");
//Tasks Controller
const { 
  updateTask 
} = require("../controllers/tasksController");

const { 
  register,
  login, 
} = require("../controllers/authenticationController");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Test User

router.get("/createDummyUser/:email", (req, res, next) => {
  const userInstance = new User({
    email: req.params.email,
    goals: [],
  });
  userInstance.save((err) => {
    if (err) {return next(err);}
    res.send(`Successfully created ${req.params.email}`);
  });
});

router.get("/fetch/:id", (req, res, next) => {
  const { id } = req.params;
  User.findById(id).populate({ path: "goals", populate: { path:"steps", populate: { path: "tasks" }}}).exec((err, user) => {
    if (err) {return next(err);}
    res.json(user);
  });
});

/* Registration */
router.post("/register", register);

router.post("/login", login);

/* Goals -RouteProtected */
router.post("/goals/add", verifyToken, addGoal);

router.post("/goals/delete", verifyToken, deleteGoal);

router.post("/goals/setAsCompleted", verifyToken, setGoalAsCompleted);

router.post("/goals/rename", verifyToken, renameGoal);

//Protected Route
router.get("/goals", verifyToken, (req, res, next) => {
  Jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) { res.sendStatus(403) }
    console.log(authData);
    res.send("Goals is working!");
  });
});

/* Steps */
router.post("/steps/add", addStep);

router.post("/steps/setAsCompleted", setStepAsCompleted);

router.post("/steps/delete", deleteStep);

router.get("/steps", (req, res, next) => {
  res.send("Steps Route!");
});

/* Tasks */
router.post("/tasks/update", updateTask);

router.get("/tasks", (req, res, next) => {
  res.send("Working For Tasks!");
});

module.exports = router;