import * as express from 'express'
import { RestController } from "./controllers";

let router = express.Router();
let controller = new RestController()

router.get('/', controller.testRoute)


export default router