import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { APIError } from "../responseHandlers/error.helper";

export const checkErrors = (req: Request) => {
    try {
        const response: any = validationResult(req);
        if (!response.isEmpty()) {
            throw response
        }
    } catch (error) {
        throw new APIError(false, 400, true, error)
    }
};