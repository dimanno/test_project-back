const{Schema, model} = require('mongoose');

const {typeUsers} = require('../constants/');
const passwordService = require("../services/password.service");

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        default: typeUsers.DRIVER,
        enum: Object.values(typeUsers)
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    }

}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

userSchema.stutics = {
    async createUserWithHashPassword(userObject) {
        const hashPassword = await passwordService.hash(userObject.password);

        return this.create({...userObject, password: hashPassword});
    }
}

module.exports = model('user', userSchema);
