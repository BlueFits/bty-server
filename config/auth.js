module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } 
        res.render("error", { msg: "Invalid Login, sending attempt to server..." });
    },
};