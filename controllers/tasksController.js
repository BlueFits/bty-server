const Step = require("../models/Step");
const Task = require("../models/Task");

exports.updateTask = (req, res, next) => {
    const { stepId, task, currentDate, } = req.body; 
    Step.findById(stepId).populate({ path: "tasks" }).exec((err, step) => {
        if (err) {return next(err);}
        const taskIndex = step.tasks.findIndex(stepTasks => stepTasks.taskDate === currentDate);
        if (taskIndex >= 0) {
            const selectedTask = step.tasks[taskIndex];
            const taskUpdate = {
                $set: {
                    tasksList: [...selectedTask.tasksList, task],
                },
            };
            Task.findByIdAndUpdate(selectedTask._id, taskUpdate, {}, (err) => {
                if (err) {return next(err);}
                res.json({
                    update: true,
                });
            });
        } else {
            const taskInstance = new Task({
                taskDate: currentDate,
                tasksList: [task],
            });
            taskInstance.save((err, savedTask) => {
                if (err) {return next(err);}

                const stepUpdate = {
                    $set: {
                        tasks: [...step.tasks, savedTask._id],
                    },
                };
                Step.findByIdAndUpdate(step._id, stepUpdate, {}, (err) => {
                    if (err) {return next(err);}
                    res.json({
                        update: false,
                        newTaskId: savedTask._id,
                    });
                });
            });
        }
    });;
};