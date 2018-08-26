const Joi = require('joi');

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[#?!@$%^&*-]?).{8,}$/;

module.exports = {
    login: {
        body: {
            user: {
                email: Joi.string().email().required(),
                password: Joi.string().regex(passwordRegex).required()
            }
        }
    },
    register: {
        body: {
            user: {
                username: Joi.string().regex(/^[a-z1-9]+$/).required(),
                email: Joi.string().email().required(),
                password: Joi.string().regex(passwordRegex).required()
            }
        }
    }
};