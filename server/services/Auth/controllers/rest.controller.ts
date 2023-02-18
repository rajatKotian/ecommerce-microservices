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
            console.log('reached', errors);
            req.body = {
                ...req.body,
                firstName: 'Rajat',
                lastName: 'Kotian',
                mobile: '9999999999',
                countryCode: '+91',
                email: "rajat.kotian@gmail.com",
                password: "123123123123",
                isEmailVerified: false,
                isMobileVerified: false,
                isActive: false,
                createdBy: "507f191e810c19729de860ea",
            }
            const response = await this.authService.createNewUser(req.body)
            assert.ok(response.success);
            res.status(200).send(response)
        } catch (error) {
            Logger.error("This is an error log");
            res.status(400).send(error)
        }
    }

}