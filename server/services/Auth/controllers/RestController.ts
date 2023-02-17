import assert from "assert";
import { APIService } from "../../../lib"
import Logger from "../../../utils/helpers/Logger";
import { IAuthService } from "../interface/common.interface";
import ServiceLayer from "../service";


export default class RestController {
    private authService: IAuthService;
    constructor() {
        this.authService = new ServiceLayer();
    }

    testRoute = async (req: any, res: any) => {
        try {
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