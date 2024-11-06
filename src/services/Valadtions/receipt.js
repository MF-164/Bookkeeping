const Joi = require('joi')

const receiptSchema = Joi.object({
    clientEmail: Joi.string().required().email().messages({
        'string.email': 'The field {#label} must be a valid email address.',
        'string.required': 'The field {#label} is required.'
    }),
    date: Joi.string().required().isoDate().messages({
        'string.isoDate': 'The field {#label} must be in ISO date format.',
        'string.required': 'The field {#label} is required.'
    }),
    amount: Joi.number().required().min(0).messages({
        'number.min': 'The field {#label} must be a number greater than or equal to 0.',
        'string.required': 'The field {#label} is required.'
    }),
    paymentMethod: Joi.string().required().valid('cash', 'credit', 'bank transfer').messages({
        'any.only': 'The field {#label} must be one of: cash, credit, bank transfer.',
        'any.required': 'The field {#label} is required.'
    }),
    details: Joi.array().items(
        Joi.object({
            prodName: Joi.string().required().messages({
                'string.required': 'The field {#label} is required.'
            }),
            cost: Joi.number().required().min(0).messages({
                'number.min': 'The field {#label} must be a number greater than or equal to 0.',
                'number.required': 'The field {#label} is required.'
            }),
            count: Joi.number().required().min(0).messages({
                'number.min': 'The field {#label} must be a number greater than or equal to 0.',
                'number.required': 'The field {#label} is required.'
            })
        })
    )
});

const receiptValidation = (receipt) => {
    const { error, value } = receiptSchema.validate(receipt, { abortEarly: false });

    if (error) {
        const errorDetails = error.details.map(err => ({
            message: err.message,
            path: err.path,
            type: err.type,
            context: err.context
        }));
        return { valid: false, error: errorDetails };
    }

    return { valid: true, value };
};


module.exports = {
    receiptValidation
}