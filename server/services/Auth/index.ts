
import * as express from 'express'
import { checkSchema, validationResult } from 'express-validator';
import { loginUserSchema, registerUserSchema } from './utils/routeValidation';
import { RestController } from "./controllers";
import passport from './utils/middleware/passport'
import { GRPCServer } from './utils/servers/GRPCServer';
import { ERROR_MESSAGES, HTTP_ERROR_STATUS_CODE } from '../../utils/constants';
import { GRPCClient } from './utils/servers/GRPCClient';

let router = express.Router();
GRPCServer.startServer();
GRPCClient.startServer();


let controller = new RestController()
router.get('/', passport.authenticate('jwt', { session: false }), controller.testRoute)
router.post('/login', checkSchema(loginUserSchema), controller.login)
router.post('/register', checkSchema(registerUserSchema), controller.register);
router.get('/get-profile', passport.authenticate('jwt', { session: false }), controller.getProfile);
router.put('/update-profile',
    passport.authenticate('jwt', { session: false }),
    controller.updateProfile
);


export default router