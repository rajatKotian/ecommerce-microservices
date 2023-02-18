import { Schema } from "express-validator";
import { ERROR_MESSAGES } from "../../../../utils/constants";

export const registerUserSchema: Schema = {
    email: {
        in: ['body'],
        notEmpty: true,
        errorMessage: ERROR_MESSAGES.EMAIL_VALIDATION,
    },
    password: {
        in: ['body'],
        notEmpty: true,
        errorMessage: ERROR_MESSAGES.PASSWORD_VALIDATION,
    },
}