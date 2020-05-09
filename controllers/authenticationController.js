const User = require("../models/User");
const Jwt = require("jsonwebtoken");
//Bcrypt Init
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.fetch = (req, res, next) => {
    const { id } = req.params;
    User.findById(id).populate({ path: "goals", populate: { path:"steps", populate: { path: "tasks" }}}).exec((err, user) => {
      if (err) {return next(err);}
      res.json(user);
    });
};

exports.register = (req, res, next) => {
    const { email, password } = req.body;    
    User.findOne({ email: email }).exec((err, result) => {
        if (err) {return next(err);}

        if (!result) {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                const userInstance = new User({
                    email,
                    password: hash,
                    goals: [],
                });
                userInstance.save((err, newUser) => {
                    if (err) {return next(err)};
                    res.json({ isValid: true, msg:"Successfully registered email" , user: newUser });
                });
            });
        } else {
            res.json({ isValid: false, msg: "Email already exists" });
        }
    });;
};

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({ error: "Invalid Parameters" });
    } else {
        //Authenticate
        User.findOne({ email }).exec((err, user) => {
            if (err) {return next(err);}

            if (!user) {
                //Send error
                res.status(400).send({ error: "That email is not registered" });
            } else {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {return next(err);}

                    if (!isMatch) {
                        res.status(400).send({ error: "Invalid Password" });
                    } else {
                        //Passwords Matched
                        //What do I need this for?
                        const loggedInUser = {
                            id: user._id,
                            email: user.email,
                            goals: user.goals,
                        };
                        
                        Jwt.sign({ user: loggedInUser }, "secretKey", { expiresIn: "43200s" }, (err, token) => {
                            if (err) {return next(err);}
                            res.json({
                                token,
                                userId: user._id,
                            });
                        });
                    }
                });
            }
        });
    }
};