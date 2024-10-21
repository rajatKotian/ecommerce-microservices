import assert from "assert";
import { Request, Response } from "express";
import { HttpErrorStatusCode, HttpSuccessStatusCode, ServiceType } from "../../../utils/constants";
import { checkErrors } from "../../../utils/helpers";
import Logger from "../../../utils/helpers/Logger";
import { IAuthService } from "../interface/service";
import { AuthService } from "../service";

export default class RestController {
    private authService: IAuthService;

    constructor () {
        this.authService = new AuthService();
    }

    testRoute = async (req: any, res: any) => {
        try {
            res.status(HttpSuccessStatusCode.ACCEPTED).send('This route is working well');
        } catch (error) {
            res.status(400).send(error);
        }
    };

    /**
    * Registers a new user.
    * @param req The request object.
    * @param res The response object.
    */
    register = async (req: Request, res: Response) => {
        try {
            checkErrors(req);
            const response = await this.authService.registerNewUser(req, req.body);
            res.status(response.httpCode).send(response);
        } catch (error) {
            Logger.error(error);
            res.status(HttpErrorStatusCode.INTERNAL_SERVER).send(error);
        }
    };

    /**
     * Logs in a user.
     * @param req The request object.
     * @param res The response object.
     */
    login = async (req: Request, res: Response) => {
        try {
            checkErrors(req);
            const response = await this.authService.loginUser(req, req.body);
            res.status(response.httpCode).send(response);
        } catch (error) {
            Logger.error(error);
            res.status(HttpErrorStatusCode.INTERNAL_SERVER).send(error);
        }
    };

    /**
     * Gets the profile details of a user.
     * @param req The request object.
     * @param res The response object.
     */
    getProfile = async (req: Request, res: Response) => {
        try {
            const response = await this.authService.getProfileDetails(req);
            res.status(response.httpCode).send(response);
        } catch (error) {
            Logger.error(error);
            res.status(HttpErrorStatusCode.INTERNAL_SERVER).send(error);
        }
    };

    /**
     * Updates the profile details of a user.
     * @param req The request object.
     * @param res The response object.
     */
    updateProfile = async (req: Request, res: Response) => {
        try {
            checkErrors(req);
            const response = await this.authService.updateProfileDetails(req, req.body);
            res.status(response.httpCode).send(response);
        } catch (error) {
            Logger.error(error);
            res.status(HttpErrorStatusCode.INTERNAL_SERVER).send(error);
        }
    };
}