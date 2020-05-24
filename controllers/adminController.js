const Admin = require("../models/Admin");
const User = require("../models/User");
const Visitor = require("../models/Visitor");
const Email = require("../models/Email");
const async = require("async");
const bcrypt = require("bcrypt");
const passport = require("passport");
const moment = require("moment");

//Inits
const visitors = Visitor.find({});
const emails  = Email.find({});
const users = User.find({});

exports.create = (req, res, next) => {
    const { secretKey } = req.params;
    const { user, pass } = req.query;
    
    if (secretKey === "createMeAn@dmin") {
        bcrypt.hash(pass, 10, (err, hash) => {
            if (err) {return next(err);}
            else {
                const adminInstance = new Admin({
                    username: user,
                    password: hash,
                });

                adminInstance.save((err) => {
                    if (err) { return next(err); }
                    else {
                        res.send("Successfully created");
                    }
                });
            }
        });
    } else {
        res.redirect("/");
    }
};

exports.adminAuth = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/admin/dashboard",
        failureRedirect: "/",
    })(req, res, next);
};

exports.adminLogout = (req, res, next) => {
    req.logout();
    res.redirect("/");
}

exports.dashboard = (req, res, next) => {
    async.parallel({
        users: (callback) => {
            users.exec(callback);
        },
        visitors: (callback) => {
            visitors.exec(callback);
        },
        emails: (callback) => {
            emails.exec(callback);
        }
    }, (err, results) => {
        if (err) {return next(err);}
        res.render("dashboard", { data: results.users, admin: req.user, visitors: results.visitors, emails: results.emails });
    });
};

exports.userList = (req, res, next) => {
    User.find({}).exec((err, users) => {
        if (err) { return next(err); }
        else {
            res.render("userList", { users, admin: req.user });
        }
    });
};

exports.userInformation = (req, res, next) => {
    const { id } = req.params;
    User.findById(id).exec((err, user) => {
        if (err) { return next(err); }
        if (!user) {
            res.send("Invalid User");
        } else {
            res.render("userInfo", { user, admin: req.user, moment })
        }
    });
};

exports.visitorsInfo = (req, res, next) => {
    visitors.exec((err, visitors) => {
        if (err) {return next(err)}
        res.render("visitors", { visitors, admin: req.user, moment });
    });
};