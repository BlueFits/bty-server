var express = require('express');
var router = express.Router();
const User = require("../models/User");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Test User
router.get("/fetch/:id", (req, res, next) => {
  const { id } = req.params;
  User.findById(id).populate("goals").exec((err, user) => {
    if (err) {return next(err);}
    console.log(`Found ${user.username}`);
    res.json(user);
  });
});

module.exports = router;