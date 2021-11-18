const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/errorHandler');
const {messageResponse, statusCode} = require('../constants')

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(messageResponse.WRONG_LOGIN_DATA, statusCode.NOT_FOUND);
        }
    }
};
