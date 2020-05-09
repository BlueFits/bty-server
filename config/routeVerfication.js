const Jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        //Forbidden
        res.status(403).send({ error: "Unauthorized request" });
    }
}

exports.verifyHeader = (req, res, next) => {
    Jwt.verify(req.token, "secretKey", (err) => {
        if (err) { res.status(403).send({ error: "Unauthorized request" }); }
        else {
            next();
        }
    });
};