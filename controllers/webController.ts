// const Email = require("../models/Email");
// const Visitor = require("../models/Visitor");
// const geoip = require("geoip-lite");

import { Request, Response } from "express";
import EmailDao from "../dao/email.dao";

class WebController {

    async collectEmail(req: Request, res: Response) {
        const { email, referrer } = req.body;
        const user = await EmailDao.createEmail(email, referrer);
        res.status(201).send({ user });
    }

};

export default new WebController;

// exports.collectEmail = (req: Request, res: Response) => {
//     const { email, referrer } = req.body;

//     const user = await EmailDao.createEmail(email, referrer);

//     // Email.findOne({ email }).exec((err, result) => {
//     //     if (err) {return next(err);}
//     //     if (result) {
//     //         res.status(401).send({ msg: "Email already subscribed" });
//     //     } else {
//     //         const emailInstance = new Email({
//     //             email,
//     //             referrer,
//     //         });
//     //         emailInstance.save((err) => {
//     //             if (err) {return next(err);}
//     //             res.status(200).send({ msg: "Successfully sent your email" });
//     //         }); 
//     //     }
//     // });
// };

// exports.addVisitorInfo = (req, res, next) => {
//     const { ip, referrer } = req.body;
//     Visitor.findOne({ ip }).exec((err, result) => {
//         if (err) {return next(err);}
//         if (!result) {
//             const geoInfo = geoip.lookup(ip);
//             const visitorInstance = new Visitor({
//                 ip,
//                 country: geoInfo.country,
//                 region: geoInfo.region,
//                 timezone: geoInfo.timezone,
//                 city: geoInfo.city,
//                 eu: Number(geoInfo.eu),
//                 referrer,
//             });

//             visitorInstance.save((err) => {
//                 if (err) {return next(err);}
//                 res.sendStatus(200);
//             });
//         } else {
//             res.sendStatus(204);
//         }
//     });
// };