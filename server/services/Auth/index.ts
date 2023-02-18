
import * as express from 'express'
import { checkSchema, validationResult } from 'express-validator';
import { registerUserSchema } from './utils/routeValidation';
import { RestController } from "./controllers";
import { APIError } from '../../utils/errorHandlers/base.error.helper';


let router = express.Router();
let controller = new RestController()
router.get('/', controller.testRoute)
router.get('/login', controller.testRoute)
router.post('/register', checkSchema(registerUserSchema), controller.registerUser);

export default router