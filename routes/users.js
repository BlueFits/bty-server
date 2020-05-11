var express = require('express');
var router = express.Router();
const { verifyHeader, verifyToken } = require("../config/routeVerfication");
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
  fetch, 
  deleteAccount,
} = require("../controllers/authenticationController");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Fetch User */
router.get("/fetch/:id", fetch);

/* Authentication */
router.post("/register", register);

router.post("/login", login);

router.post("/delete", verifyToken, verifyHeader, deleteAccount);

/* Goals -RouteProtected */
router.post("/goals/add", verifyToken, verifyHeader, addGoal);

router.post("/goals/delete", verifyToken, verifyHeader, deleteGoal);

router.post("/goals/setAsCompleted", verifyToken, verifyHeader, setGoalAsCompleted);

router.post("/goals/rename", verifyToken, verifyHeader, renameGoal);

//Protected Route
router.get("/goals", verifyToken, verifyHeader, (req, res, next) => {
  res.send("Goals is protected");
});

/* Steps */
router.post("/steps/add", verifyToken, verifyHeader, addStep);

router.post("/steps/setAsCompleted", verifyToken, verifyHeader, setStepAsCompleted);

router.post("/steps/delete", verifyToken, verifyHeader, deleteStep);

router.get("/steps", verifyToken, verifyHeader, (req, res, next) => {
  res.send("Steps working!");
});

/* Tasks */
router.post("/tasks/update", verifyToken, verifyHeader, updateTask);

router.get("/tasks", verifyToken, verifyHeader, (req, res, next) => {
  res.send("Working For Tasks!");
});

module.exports = router;