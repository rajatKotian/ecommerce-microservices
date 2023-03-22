
import * as express from 'express'
import { checkSchema, validationResult } from 'express-validator';
import { loginUserSchema, registerUserSchema } from './utils/routeValidation';
import { RestController } from "./controllers";
import passport from './utils/middleware/passport'
import { GRPCServer } from './utils/servers/GRPCServer';

let router = express.Router();
GRPCServer.startServer()
let controller = new RestController()
router.get('/', controller.testRoute)

export default router