
import * as express from 'express';
import { RestController } from "../controllers";
import { IController, IRouter } from '../../../utils/interface';

export class InvertoryRouter extends IRouter {
    protected router = express.Router();
    protected controller = new RestController();

    initializeRoutes(): express.Router {
        this.router.get('/products', this.controller.listProducts.bind(this.controller));
        return this.router;
    }
}