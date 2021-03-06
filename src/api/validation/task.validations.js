const Joi = require('joi');

module.exports = {
    create: {
        body: {
            task: Joi.object({
                taskName: Joi.string().required(),
                maximumTaskPoints: Joi.number().min(0).max(50).required(),
                currentTaskPoints: Joi.number().min(0).max(50).required(),
                taskStatus: Joi.any().forbidden()
            })
        },
        params: {
            userId: Joi.number().positive().required(),
        }
    },
    update: {
        body: {
            task: Joi.object({
                taskName: Joi.string(),
                maximumTaskPoints: Joi.number().min(0).max(50),
                currentTaskPoints: Joi.number().min(0).max(50),
                taskStatus: Joi.any().forbidden()

            })
        },
        params: {
            userId: Joi.number().positive().required(),
            taskId: Joi.number().positive().required()
        }
    },
    userAndTaskParams: {
        params: {
            userId: Joi.number().positive().required(),
            taskId: Joi.number().positive().required()
        }
    },
    userParams: {
        params: {
            userId: Joi.number().positive().required()
        }
    }
};