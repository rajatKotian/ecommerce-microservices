import assert from "assert";
import { validationResult } from "express-validator";
import { APIService } from "../../../lib"
import { checkErrors } from "../../../utils/helpers";
import Logger from "../../../utils/helpers/Logger";
import { AuthService } from "../service";


export default class RestController {
    private authService: any;
    private helper: any;

    constructor() {
        this.authService = new AuthService();
    }

    testRoute = async (req: any, res: any) => {
        try {
            res.status(200).send('This route is working well')
        } catch (error) {
            Logger.error("This is an error log");
            res.status(400).send(error)
        }
    }

    registerUser = async (req: any, res: any) => {
        try {
            const errors = checkErrors(req);
            const response = await this.authService.createNewUser(req.body)
            assert.ok(response.success);
            res.status(200).send(response)
        } catch (error) {
            Logger.error("This is an error log");
            res.status(400).send(error)
        }
    }
    loginUser = async (req: any, res: any) => {
        try {
            const errors = checkErrors(req);
            const response = await this.authService.createNewUser(req.body)
            assert.ok(response.success);
            res.status(200).send(response)
        } catch (error) {
            Logger.error("This is an error log");
            res.status(400).send(error)
        }
    }
}