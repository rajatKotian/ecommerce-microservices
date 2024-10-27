import { HttpErrorStatusCode } from "../constants";

// A base error class that extends the built-in JavaScript Error class.
class BaseError extends Error {
    // Public properties to store error-related information.
    public readonly success: boolean;
    public readonly httpCode: HttpErrorStatusCode;
    public readonly isOperational: boolean;
    public readonly description: string;

    // Constructor to initialize properties of the error instance.
    constructor(success: boolean, httpCode: HttpErrorStatusCode, isOperational: boolean, description: any) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.success = success;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        this.description = description;

        // Captures the current stack trace, excluding the constructor call from it.
        Error.captureStackTrace(this);
    }
}

// A specific error class for API-related errors that extends the BaseError class.
export class APIError extends BaseError {
    // Constructor to create an APIError instance with default values if not provided.
    constructor(success: boolean, httpCode = HttpErrorStatusCode.INTERNAL_SERVER, isOperational = true, description: any) {
        super(success, httpCode, isOperational, description);
    }
}