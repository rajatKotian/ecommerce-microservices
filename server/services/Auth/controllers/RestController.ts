import { APIService } from "../../../lib"
import Logger from "../../../utils/helpers/Logger";


export default class RestController {
    testRoute = async (req: any, res: any) => {
        try {
            let service = new APIService({ body: "hello", endpoint: "/v1/inventory", "headers": {}, serviceType: "REST", method: "GET", params: "hello" })
            Logger.error("This is an error log");
            res.send({ success: true, msg: "This is an internal test route" })
            // log("response", response)
        } catch (error) {
            Logger.error("This is an error log");

        }

    }

}