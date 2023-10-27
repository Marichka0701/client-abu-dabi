import Joi from "joi";

import {constantsRegex} from "../constants/regex";

export const loginValidator = Joi.object({
    username: Joi.string().pattern(constantsRegex.EMAIL).required().messages({
        'string.empty': 'The \'login\' field is required',
    }),
    password: Joi.string().required().min(8).messages({
        'string.empty': 'The \'password\' field is required',
        'string.min': 'At least 8 characters'
    })
})