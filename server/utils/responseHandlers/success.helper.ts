import { ERROR_MESSAGES } from "../constants";

enum HttpSuccessStatusCode {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    PARTIAL_INFORMATION = 203,
    NO_INFORMATION = 204,
}

class BaseSuccess {
    public readonly success: boolean;
    public readonly httpCode: HttpSuccessStatusCode;
    public readonly response: any;

    constructor(success: boolean, httpCode: HttpSuccessStatusCode, response: any) {
        Object.setPrototypeOf(this, new.target.prototype);

        this.success = success;
        this.httpCode = httpCode;
        this.response = response;
    }
}

export class APISuccess extends BaseSuccess {
    constructor(success = true, httpCode = HttpSuccessStatusCode.OK, response: any) {
        super(success, httpCode, response)
    }
}