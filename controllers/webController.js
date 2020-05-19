const Email = require("../models/Email");
const Visitor = require("../models/Visitor");
const geoip = require("geoip-lite");

exports.collectEmail = (req, res, next) => {
    const { email } = req.body;

    Email.findOne({ email }).exec((err, result) => {
        if (err) {return next(err);}
        if (result) {
            res.status(401).send({ msg: "Email already subscribed" });
        } else {
            const emailInstance = new Email({
                email
            });
            emailInstance.save((err) => {
                if (err) {return next(err);}
                res.status(200).send({ msg: "Successfully sent your email" });
            }); 
        }
    });
};

exports.addVisitorInfo = (req, res, next) => {
    const { ip } = req.body;
    Visitor.findOne({ ip }).exec((err, result) => {
        if (err) {return next(err);}
        if (!result) {
            const geoInfo = geoip.lookup(ip);
            const visitorInstance = new Visitor({
                ip,
                country: geoInfo.country,
                region: geoInfo.region,
                timezone: geoInfo.timezone,
                city: geoInfo.city,
                eu: Number(geoInfo.eu),
            });

            visitorInstance.save((err) => {
                if (err) {return next(err);}
                res.sendStatus(200);
            });
        } else {
            res.sendStatus(204);
        }
    });
};