const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const Admin = require("../dao/models/Admin");

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: "username" }, (username, password, done) => {
            Admin.findOne({ username }).exec((err, admin) => {
                if (err) {return next(err);}
                else {
                    if (!admin) {
                        return done(null, false, { message: "Invalid username, sending attempt log to server..." });
                    }
                    bcrypt.compare(password, admin.password, (err, isMatch) => {
                        if (err) {return next(err);}

                        if (!isMatch) {
                            return done(null, false, { message: "Invalid password, sending attempt log to server..." });
                        } else {
                            return done(null, admin);
                        }
                    });
                }
            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
        Admin.findById(id, (err, user) => {
            done(err, user);
        });
    });
};