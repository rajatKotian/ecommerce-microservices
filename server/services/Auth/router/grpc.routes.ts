
import * as express from 'express'
import { GRPCController } from "../controllers";


let router = express.Router();



let controller = new GRPCController()
router.get('/get-user-by-id', controller.getUserById);


export default router