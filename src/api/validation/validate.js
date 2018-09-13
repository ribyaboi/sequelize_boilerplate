const Joi = require('joi');
const APIError = require('../utils/APIError');
const httpStatus = require('http-status');

exports.validate = function (schema, options) {
    if (!options) {
        options = {abortEarly: false};
    }

    if (schema) {
        return function (req, res, next) {
            let errors = [];
            if (schema.params) {
                Joi.validate(req.params, schema.params, options, (err) => {
                    if (err) { errors.push(err); }
                });
            }
            if (schema.body) {
                Joi.validate(req.body, schema.body, options, (err) => {
                    if (err) { errors.push(err); }
                });
            }
            if (schema.query) {
                Joi.validate(req.body, schema.body, options, (err) => {
                    if (err) { errors.push(err); }
                });
            }
            if (errors.length !== 0) {
                return next(apiValidationError(errors));
            }
            next()
        }
    }
    throw new Error("No schema provided");
};

const apiValidationError = function (joiErrors) {
    return new APIError({
        message: joiErrors[0].name,
        status: httpStatus.BAD_REQUEST,
        errors: joiErrors.map(joiError => {
            return joiError.details.map(errorDetail => {
                return {
                    name: "ValidationError",
                    message: errorDetail.message
                }
            })
        }).reduce((acc, arr) => acc.concat(arr))
    })
};