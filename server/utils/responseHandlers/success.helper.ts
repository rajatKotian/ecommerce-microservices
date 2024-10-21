import { ERROR_MESSAGES, HttpErrorStatusCode, HttpSuccessStatusCode } from "../constants";


class BaseSuccess {
    public readonly success: boolean;
    public readonly httpCode: HttpErrorStatusCode | HttpSuccessStatusCode 
    public readonly response: any;

    constructor (success: boolean, httpCode: HttpErrorStatusCode | HttpSuccessStatusCode, response: any) {
        Object.setPrototypeOf(this, new.target.prototype);

        this.success = success;
        this.httpCode = httpCode;
        this.response = response;
    }
}

export class APISuccess extends BaseSuccess {
    constructor (success: boolean, httpCode: HttpErrorStatusCode | HttpSuccessStatusCode, response: any) {
        super(success, httpCode, response)
    }
}