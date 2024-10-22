import assert from "assert";
import { Request, Response } from "express";
import { HttpSuccessStatusCode } from "../../../utils/constants";
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
            res.status(HttpSuccessStatusCode.ACCEPTED).send('This route is working well')
        } catch (error) {
            res.status(400).send(error)
        }
    }

    listCart = async (req: Request, res: any) => {
        try {
            res.status(HttpSuccessStatusCode.ACCEPTED).send('This route is working well');
        } catch (error) {
            res.status(400).send(error);
        }
    };

    addProductsToCart = async (req: Request, res: any) => {
        try {
            res.status(HttpSuccessStatusCode.ACCEPTED).send('This route is working well');
        } catch (error) {
            res.status(400).send(error);
        }
    };

    updateCart = async (req: Request, res: any) => {
        try {
            res.status(HttpSuccessStatusCode.ACCEPTED).send('This route is working well');
        } catch (error) {
            res.status(400).send(error);
        }
    };
}