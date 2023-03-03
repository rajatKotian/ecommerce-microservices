import assert from "assert";
import { HTTP_ERROR_STATUS_CODE } from "../../../utils/constants";
import { checkErrors } from "../../../utils/helpers";
import Logger from "../../../utils/helpers/Logger";
import { AuthService } from "../service";


export default class RestController {
    private authService: any;

    constructor() {
        this.authService = new AuthService();
    }

    testRoute = async (req: any, res: any) => {
        try {
            res.status(200).send('This route is working well')
        } catch (error) {
            res.status(400).send(error)
        }
    }

    register = async (req: any, res: any) => {
        try {
            checkErrors(req);
            const response = await this.authService.registerNewUser(req.body)
            res.status(response.httpCode).send(response)
        } catch (error) {
            Logger.error(error);
            res.status(HTTP_ERROR_STATUS_CODE.INTERNAL_SERVER).send(error)
        }
    }

    login = async (req: any, res: any) => {
        try {
            checkErrors(req);
            const response = await this.authService.loginUser(req.body)
            res.status(200).send(response)
        } catch (error) {
            Logger.error(error);
            res.status(HTTP_ERROR_STATUS_CODE.INTERNAL_SERVER).send(error)
        }
    }
}