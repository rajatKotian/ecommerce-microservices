import { Request, Response } from "express";
import { HttpSuccessStatusCode } from "../../../utils/constants";
import InventoryServiceLayer from "../service/inventory.service";
import { IController } from "../../../utils/interface";

export default class RestController extends IController {
    readonly service = new InventoryServiceLayer();

    testRoute = async (req: Request, res: Response) => {
        try {
            res.status(HttpSuccessStatusCode.ACCEPTED).send('This route is working well')
        } catch (error) {
            res.status(400).send(error)
        }
    }
    listProducts = async (req: Request, res: Response) => {
        try {
            const { skip, limit } = req.body;
            const response = await this.service.listProductsService({ skip, limit })
            res.status(HttpSuccessStatusCode.ACCEPTED).send('This route is working well');
        } catch (error) {
            res.status(400).send(error);
        }
    };
}