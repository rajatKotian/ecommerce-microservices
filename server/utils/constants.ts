export const ENVIRONMENTS = Object.freeze({
    PRODUCTION: "production",
    DEVELOPMENT: "development",
    STAGING: "staging",
})

export const REST_METHODS = Object.freeze({
    GET: "get",
    PUT: "put",
    POST: "post",
    DELETE: "delete",
    PATCH: "patch",
})

export const ERROR_MESSAGES = Object.freeze({
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    IS_EMAIL_VERIFIED_FLAG_ERROR: "Please add isEmailVerified flag for the user",
    IS_MOBILE_VERIFIED_FLAG_ERROR: "Please add isMobileVerified flag for the user",
    MOBILE_VALIDATION: "Add a valid mobile number and countryCode",
    EMAIL_VALIDATION: "Email id cannot be empty",
    FIRSTNAME_VALIDATION: "FirstName cannot be empty",
    PASSWORD_VALIDATION: "Password cannot be empty",
    INVALID_CREDENTIALS: "Sorry! Invalid Credentials",
    USER_EXISTS: "User already Exists, Try logging in!"
})
export const HTTP_SUCCESS_STATUS_CODE = Object.freeze({
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    PARTIAL_INFORMATION: 203,
    NO_INFORMATION: 204,
})

export const HTTP_ERROR_STATUS_CODE = Object.freeze({
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
    NOT_IMPLEMENTED: 501,
})


export const LOGGER_CONSTANTS = Object.freeze({
    COLORS: {
        ERROR: 'red',
        WARN: 'yellow',
        INFO: 'green',
        HTTP: 'magenta',
        DEBUG: 'white',
    },
    LEVELS: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
    }
})