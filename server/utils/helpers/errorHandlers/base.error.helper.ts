import { ERROR_MESSAGES } from "../../constants";

enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
}

class BaseError extends Error {
    public readonly success: boolean;
    public readonly httpCode: HttpStatusCode;
    public readonly isOperational: boolean;

    constructor(success: boolean, httpCode: HttpStatusCode, isOperational: boolean, description: string) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.success = success;
        this.httpCode = httpCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}

export class APIError extends BaseError {
    constructor(success: boolean, httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, description = ERROR_MESSAGES.INTERNAL_SERVER_ERROR,) {
        super(success, httpCode, isOperational, description)
    }
}