import assert from "assert";
import { Request, Response } from "express";
import { HTTP_ERROR_STATUS_CODE, HTTP_SUCCESS_STATUS_CODE } from "../../../utils/constants";
import { checkErrors } from "../../../utils/helpers";
import Logger from "../../../utils/helpers/Logger";
import { IAuthService } from "../interface/service";
import { AuthService } from "../service";


export default class RestController {
    private authService: IAuthService;

    constructor() {
        this.authService = new AuthService();
    }

    testRoute = async (req: any, res: any) => {
        try {
            res.status(HTTP_SUCCESS_STATUS_CODE.ACCEPTED).send('This route is working well')
        } catch (error) {
            res.status(400).send(error)
        }
    }

    register = async (req: Request, res: Response) => {
        try {
            checkErrors(req);
            const response = await this.authService.registerNewUser(req, req.body)
            res.status(response.httpCode).send(response)
        } catch (error) {
            Logger.error(error);
            res.status(HTTP_ERROR_STATUS_CODE.INTERNAL_SERVER).send(error)
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            checkErrors(req);
            const response = await this.authService.loginUser(req, req.body)
            res.status(response.httpCode).send(response)
        } catch (error) {
            Logger.error(error);
            res.status(HTTP_ERROR_STATUS_CODE.INTERNAL_SERVER).send(error)
        }
    }

    getProfile = async (req: Request, res: Response) => {
        try {
            const response = await this.authService.getProfileDetails(req)
            res.status(response.httpCode).send(response)
        } catch (error) {
            Logger.error(error);
            res.status(HTTP_ERROR_STATUS_CODE.INTERNAL_SERVER).send(error)
        }
    }

    updateProfile = async (req: Request, res: Response) => {
        try {
            checkErrors(req);
            const response = await this.authService.updateProfileDetails(req, req.body)
            res.status(response.httpCode).send(response)
        } catch (error) {
            Logger.error(error);
            res.status(HTTP_ERROR_STATUS_CODE.INTERNAL_SERVER).send(error)
        }
    }
}