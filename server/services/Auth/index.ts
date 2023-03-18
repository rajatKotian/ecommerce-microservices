
import * as express from 'express'
import { checkSchema, validationResult } from 'express-validator';
import { loginUserSchema, registerUserSchema } from './utils/routeValidation';
import { RestController } from "./controllers";
import passport from './utils/middleware/passport'

let router = express.Router();
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