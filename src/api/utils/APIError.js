const httpStatus = require('http-status');

class APIError extends Error {
    constructor({
                    message = httpStatus[status],
                    status = httpStatus.INTERNAL_SERVER_ERROR,
                    errors = [],
                    stack = null
                }) {
        super(message);
        this.name = 'APIError';
        this.message = message;
        this.errors = errors;
        this.status = status;
        stack ? this.stack = stack : Error.captureStackTrace(this, APIError)
    }
}

module.exports = APIError;