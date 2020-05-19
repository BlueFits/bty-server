var express = require('express');
var router = express.Router();
const { collectEmail, addVisitorInfo } = require("../controllers/webController");

/* GET home page. */
router.post("/utils/collect_email", collectEmail);

router.post("/utils/add_visitor_info", addVisitorInfo);

router.get('/', (req, res, next) => {
    res.render("home");
});

module.exports = router;