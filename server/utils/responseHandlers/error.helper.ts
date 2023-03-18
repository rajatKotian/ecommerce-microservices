import { ERROR_MESSAGES } from "../constants";

enum HttpErrorStatusCode {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
    NOT_IMPLEMENTED = 501,
}

class BaseError extends Error {
    public readonly success: boolean;
    public readonly httpCode: HttpErrorStatusCode;
    public readonly isOperational: boolean;
    public readonly description: string;

    constructor(success: boolean, httpCode: HttpErrorStatusCode, isOperational: boolean, description: any) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.success = success;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        this.description = description;

        Error.captureStackTrace(this);
    }
}

export class APIError extends BaseError {
    constructor(success: boolean, httpCode = HttpErrorStatusCode.INTERNAL_SERVER, isOperational = true, description: any) {
        super(success, httpCode, isOperational, description)
    }
}