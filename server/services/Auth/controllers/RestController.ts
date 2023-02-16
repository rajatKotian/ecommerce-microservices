import { APIService } from "../../../lib"
import Logger from "../../../utils/helpers/Logger";
import { IAuthService } from "../interface/common.interface";
import { IServiceLayerResponse } from "../interface/response";
import ServiceLayer from "../services";


export default class RestController {
    private authService: IAuthService;
    constructor() {
        this.authService = new ServiceLayer();
    }

    testRoute = async (req: any, res: any) => {
        try {
            const response = await this.authService.createNewUser(req.body)
            console.log('RESPONSE', response)
            res.status(400).send(response)
        } catch (error) {
            Logger.error("This is an error log");
            res.status(400).send({ success: false, msg: error })
        }
    }

}