
import * as express from 'express'
import { checkSchema, validationResult } from 'express-validator';
import { loginUserSchema, registerUserSchema } from './utils/routeValidation';
import { RestController } from "./controllers";
import passport from './utils/middleware/passport'

let router = express.Router();
let controller = new RestController()
router.get('/', passport.authenticate('jwt', { session: false }), controller.testRoute)

export default router