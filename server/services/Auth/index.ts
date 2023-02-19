
import * as express from 'express'
import { checkSchema, validationResult } from 'express-validator';
import { loginUserSchema, registerUserSchema } from './utils/routeValidation';
import { RestController } from "./controllers";
import { APIError } from '../../utils/errorHandlers/base.error.helper';


let router = express.Router();
let controller = new RestController()
router.get('/', controller.testRoute)
router.get('/login', checkSchema(loginUserSchema), controller.login)
router.post('/register', checkSchema(registerUserSchema), controller.register);

export default router