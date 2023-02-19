import assert from "assert";
import { validationResult } from "express-validator";
import { APIService } from "../../../lib"
import { Encrypt } from "../../../utils/encryptionHelper";
import { checkErrors } from "../../../utils/helpers";
import Logger from "../../../utils/helpers/Logger";
import { IEncryption } from "../../../utils/interface";
import { AuthService } from "../service";


export default class RestController {
    private authService: any;
    private helper: any;
    private encrypt: IEncryption;

    constructor() {
        this.authService = new AuthService();
        this.encrypt = new Encrypt();
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
            assert.ok(response.success);
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    login = async (req: any, res: any) => {
        try {
            checkErrors(req);
            const response = await this.authService.loginUser(req.body)
            assert.ok(response.success);
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send(error)
        }
    }
}