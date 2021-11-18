const {User} = require('../database')
const ErrorHandler = require("../errors/errorHandler");
const {messageResponse, statusCode} = require("../constants");
const {userNormalizator} = require("../util/user,util");
const {passwordService} = require("../services");

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const {password} = req.body;
            const hashedPassword = await passwordService.hash(password);

            const newUser = await User.create({...req.body, password: hashedPassword});
            const userNormalise = userNormalizator(newUser.toJSON());

            res.status(statusCode.CREATED).json(userNormalise);
        } catch (e) {
            next(e)
        }
    },
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find({}).lean();

            const newUsers = users.map(user => userNormalizator(user));

            res.json(newUsers);
        } catch (e) {
            next(e);
        }
    },
    getUser: async (req, res, next) => {
        try {
            const user = userNormalizator(req.body);
            await res.json(user);
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const {user_id} = req.params

            const user = req.body;
            const {username} = user
            const userUpdated = await User.findByIdAndUpdate( user_id,
                user,{new:true} )
            const checkUsername = await User.findOne({username})
            if (checkUsername) {
                throw new ErrorHandler(messageResponse.DATA_EXIST, statusCode.FORBIDDEN)
            }

            res.json(userUpdated)
        } catch (e) {
            next(e)
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {user_id} = req.params;
            await User.findByIdAndDelete(user_id);

            res.sendStatus(statusCode.NO_DATA);
        } catch (e) {
            next(e);
        }
    }
}
