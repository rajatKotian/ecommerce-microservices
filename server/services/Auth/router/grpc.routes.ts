
import * as express from 'express'
import { GRPCController } from "../controllers";


let router = express.Router();



let controller = new GRPCController()
router.get('/', controller.test);


export default router