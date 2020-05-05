const Goal = require("../models/Goal");
const Step = require("../models/Step");

exports.addStep = (req, res, next) => {
    const { goalId, stepToAdd } = req.body;
    const stepInstance = new Step({
        stepName: stepToAdd,
        isComplete: false,
        tasks: [],
    });
    stepInstance.save((err, newStep) => {
        if (err) {return next(err);}
        Goal.findById(goalId).populate("steps").exec((err, goal) => {
            if (err) {return next(err);}
            const update = {
                $set: {
                    steps: [...goal.steps, newStep._id],
                },
            };
            Goal.findByIdAndUpdate(goal._id, update, {}, (err) => {
                if (err) {return next(err);}
                console.log(newStep._id);
                res.json(newStep._id);
            });
        });
    });
};

exports.setAsCompleted = (req, res, next) => {
    const { stepId } = req.body;
    Step.findByIdAndUpdate(stepId, {$set:{ isComplete: true }}, {}, (err) => {
        if (err) {return next(err);} 
        res.sendStatus(200);
    });
};

exports.deleteStep = (req, res, next) => {
    const { stepId } = req.body;
    Step.findByIdAndDelete(stepId, {}, (err) => {
        if (err) {return next(err);}
        res.sendStatus(200);
    });
};