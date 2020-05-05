const express = require('express');
const router = express.Router();
//Controllers
const { addStep, setAsCompleted, deleteStep } = require("../controllers/stepsController");

//Test User
router.get("/", (req, res, next) => {
    res.send("Steps Route!");
});

router.post("/addStep", addStep);

router.post("/setAsCompleted", setAsCompleted);

router.post("/delete", deleteStep);

module.exports = router;