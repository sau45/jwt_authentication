import Joi from 'joi';

const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required()
})

const registerSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required()
})

const contactSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().lowercase().required(),
    message: Joi.string().min(1).required()
})

export {authSchema,contactSchema,registerSchema};