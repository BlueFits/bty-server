var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
//CONTROLLERS
const { 
    dashboard, 
    userList,
    userInformation, 
    adminAuth, 
    create, 
    adminLogout,
    visitorsInfo,
} = require("../controllers/adminController");

/* Admin Auth */
router.post('/auth', adminAuth);

router.get("/logout", adminLogout);

/* Create admin */
router.get("/create/:secretKey", ensureAuthenticated, create);

/* Admin routes */
router.get("/dashboard", ensureAuthenticated, dashboard);

router.get("/userList", ensureAuthenticated, userList);

router.get("/information/:id", ensureAuthenticated, userInformation);

router.get("/visitors", ensureAuthenticated, visitorsInfo);


module.exports = router;