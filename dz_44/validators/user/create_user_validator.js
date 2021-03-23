const Joi = require('joi');

const regexpEnum = require('../../constants/regexp');

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(50),
    password: Joi.string().regex(regexpEnum.PASSWORD).required(),
    email: Joi.string().regex(regexpEnum.EMAIL).required(),
    role: Joi.string().valid('user', 'admin')
});
