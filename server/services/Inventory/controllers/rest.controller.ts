import { Request, Response } from "express";
import { HttpSuccessStatusCode } from "../../../utils/constants";

export default class RestController {
    testRoute = async (req: Request, res: Response) => {
        try {
            res.status(HttpSuccessStatusCode.ACCEPTED).send('This route is working well')
        } catch (error) {
            res.status(400).send(error)
        }
    }
}