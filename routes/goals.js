const express = require('express');
const router = express.Router();
//Controllers
const { 
    addGoal, 
    deleteGoal, 
    setAsCompleted, 
    renameGoal,
} = require("../controllers/goalsController");

//Test User
router.get("/", (req, res, next) => {
    res.send("Working!");
});

router.post("/add", addGoal);

router.post("/delete", deleteGoal);

router.post("/setAsCompleted", setAsCompleted);

router.post("/renameGoal", renameGoal);

module.exports = router;