const Joi = require('joi');

const clientSchema = Joi.object({
    firstName: Joi.string().required().pattern(new RegExp('^[A-Za-z]+$')),
    lastName: Joi.string().required().pattern(new RegExp('^[A-Za-z]+$')),
    email: Joi.string().email().required()
});

const clientValidation = (client = {}) => {
    const { error, value } = clientSchema.validate(client);
    
    return {
        valid: !error,
        ...(error && { error: error.details }),
        value: value
    };
};

module.exports = {
    clientValidation
}
