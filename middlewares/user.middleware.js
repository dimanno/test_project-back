const {User} = require('../database');
const ErrorHandler = require('../errors/errorHandler');
const {messageResponse, statusCode} = require('../constants')

module.exports = {
    checkUserExist: async (req, res, next) => {
        try {
            const {username} = req.body;
            const user = await User.findOne({username});

            if (user) {
                throw new ErrorHandler(messageResponse.DATA_EXIST, statusCode.FORBIDDEN);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    isUserExist: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            const {user} = req.body;

            await User.findById(user_id).lean();

            if (!user && user_id) {
                throw new ErrorHandler(messageResponse.USER_NOT_FOUND, statusCode.NOT_FOUND)
            }

            req.body = user;
            next();
        } catch (e) {
            next(e)
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const user = await User
                .findOne({email: req.body.email} )
                .select('+password')
                .lean()

            if (!user) {
                throw new ErrorHandler(messageResponse.USER_NOT_FOUND, statusCode.NOT_FOUND)
            }

            req.user = user;
            next();
        } catch (e) {
            next(e)
        }
    },
};
