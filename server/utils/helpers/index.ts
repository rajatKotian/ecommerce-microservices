import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import { APIError } from "../responseHandlers/error.helper";
import Logger from "./Logger";

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

export const checkPassword = async (password: string, userAddedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, userAddedPassword);
};