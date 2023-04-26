import { Request, Response } from "express";
import { HTTP_SUCCESS_STATUS_CODE } from "../../../utils/constants";

export default class RestController {
    testRoute = async (req: Request, res: Response) => {
        try {
            res.status(HTTP_SUCCESS_STATUS_CODE.ACCEPTED).send('This route is working well')
        } catch (error) {
            res.status(400).send(error)
        }
    }
}