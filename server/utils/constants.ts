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
    EMAIL_VALIDATION: "Email id cannot be empty",
    PASSWORD_VALIDATION: "Password cannot be empty"
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