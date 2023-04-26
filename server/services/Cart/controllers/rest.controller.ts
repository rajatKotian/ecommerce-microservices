import assert from "assert";
import { Request, Response } from "express";
import { HTTP_ERROR_STATUS_CODE, HTTP_SUCCESS_STATUS_CODE } from "../../../utils/constants";
import { checkErrors } from "../../../utils/helpers";
import Logger from "../../../utils/helpers/Logger";
import { ICartService } from "../interface/service";
import { CartService } from "../service";


export default class RestController {
    private cartService: ICartService;

    constructor() {
        this.cartService = new CartService();
    }

    testRoute = async (req: Request, res: any) => {
        try {
            res.status(HTTP_SUCCESS_STATUS_CODE.ACCEPTED).send('This route is working well')
        } catch (error) {
            res.status(400).send(error)
        }
    }
}