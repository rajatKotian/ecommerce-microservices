import { Request, Response } from "express";
import { HttpSuccessStatusCode } from "../../../utils/constants";
import { IInventoryService } from "../interface/service";
import InventoryServiceLayer from "../service/inventory.service";

export default class RestController {
    private service: IInventoryService;
    constructor () {
        this.service = new InventoryServiceLayer();
    }


    testRoute = async (req: Request, res: Response) => {
        try {
            res.status(HttpSuccessStatusCode.ACCEPTED).send('This route is working well')
        } catch (error) {
            res.status(400).send(error)
        }
    }
    listProducts = async (req: Request, res: Response) => {
        try {
            res.status(HttpSuccessStatusCode.ACCEPTED).send('This route is working well');
        } catch (error) {
            res.status(400).send(error);
        }
    };
}