import { Schema } from "express-validator";
import { ERROR_MESSAGES } from "../../../../utils/constants";

export const registerUserSchema: Schema = {
    firstName: {
        in: ['body'],
        notEmpty: true,
        errorMessage: ERROR_MESSAGES.FIRSTNAME_VALIDATION,
    },
    mobile: {
        in: ['body'],
        notEmpty: true,
        errorMessage: ERROR_MESSAGES.MOBILE_VALIDATION,
    },
    countryCode: {
        in: ['body'],
        notEmpty: true,
        errorMessage: ERROR_MESSAGES.MOBILE_VALIDATION,
    },
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


export const loginUserSchema: Schema = {
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