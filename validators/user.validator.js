const Joi = require('joi');
const {regEx,typeUsers} = require('../constants')

const createUserValidator = Joi.object({
    username: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    firstname: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    lastname: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    email: Joi
        .string()
        .regex(regEx.EMAIL_REGEXP)
        .required()
        .trim(),
    type: Joi
        .string()
        .allow(...Object.values(typeUsers)),
    password: Joi
        .string()
        .regex(regEx.PASSWORD_REGEXP)
        .required()
        .trim(),
});


module.exports = {
    createUserValidator,
};
