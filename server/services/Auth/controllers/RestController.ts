import { APIService } from "../../../lib"
import Logger from "../../../utils/helpers/Logger";


export default class RestController {
    testRoute = async (req: any, res: any) => {
        try {
            res.send({ success: true, msg: "This is an internal test route" })
        } catch (error) {
            Logger.error("This is an error log");
            res.send({ success: false, msg: error })
        }

    }

}