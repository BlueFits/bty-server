const User = require("../models/User");
const Goal = require("../models/Goal");

exports.addGoal = (req, res, next) => {
    const { userId, goal, selectedColor, startDate } = req.body;
    const goalInstance = new Goal({
        goalName: goal,
        steps: [],
        status: "on-going",
        startDate,
        goalColor: selectedColor,
    });
    goalInstance.save((err, savedGoal) => {
        if (err) {return next(err);}
        User.findById(userId, (err, user) => {
            if (err) {return next(err);}
            const userUpdate = {
                $set: {
                    goals: [...user.goals, savedGoal._id],
                }
            };
            //userUpdate.$set.goals.push(savedGoal._id);
            User.findByIdAndUpdate(user._id, userUpdate, {}, (err) => {
                if (err) {return next(err);}
                res.json(savedGoal);
            })
        })
    });
};

exports.deleteGoal = (req, res, next) => {
    const { userId, goalId } = req.body;
    User.findById(userId).populate("goals").exec((err, user) => {
        if (err) {return next(err);}
        const goalSnapShot = [...user.goals];
        const goalIndex = goalSnapShot.findIndex(goal => goal._id === goalId);
        goalSnapShot.splice(goalIndex, 1);
        const userUpdate = {
            $set: {
                goals: goalSnapShot
            },
        };
        User.findByIdAndUpdate(user._id, userUpdate, {}, (err) => {
            if (err) {return next(err);}
            Goal.findByIdAndDelete(goalId, {}, (err) => {
                if (err) {return next(err);}
                res.sendStatus(200);
            });
        });
    });
};

exports.setAsCompleted = (req, res, next) => {
    const { goalId } = req.body;
    Goal.findByIdAndUpdate(goalId, {$set:{ status: "completed" }}, {}, (err, goal) => {
        if (err) {return next(err);}
        res.sendStatus(200);
    });
};

exports.renameGoal = (req, res, next) => {
    const { goalId, updateValue } = req.body;
    Goal.findByIdAndUpdate(goalId, {$set:{ goalName: updateValue }}, {}, (err) => {
        if (err) {return next(err);}
        res.sendStatus(200);
    }); 
};