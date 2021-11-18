const ErrorHandler = require('../errors/errorHandler');
const {messageResponse, statusCode} = require('../constants');

module.exports = {
    dataValidMiddleware: (validator) => (req, res, next) => {
        try {
            const {err, value} = validator.validate(req.body);

            if (err) {
                throw new ErrorHandler(err.details[0].message, statusCode.BAD_REQUEST);
            }

            req.body = value;
            next()
        } catch (e) {
            next(e)
        }
    },
}
