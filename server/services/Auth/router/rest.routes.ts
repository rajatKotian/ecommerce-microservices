
import * as express from 'express'
import { checkSchema } from 'express-validator';
import { loginUserSchema, registerUserSchema } from '../utils/routeValidation';
import { RestController } from "../controllers";
import passport from '../utils/middleware/passport'
import { IController, IRouter } from '../../../utils/interface';



export class AuthRouter extends IRouter {
    protected router = express.Router();
    protected controller = new RestController();
    public initializeRoutes(): express.Router {
        this.router.get('/', passport.authenticate('jwt', { session: false }), this.controller.testRoute.bind(this.controller));
        this.router.post('/login', checkSchema(loginUserSchema), this.controller.login.bind(this.controller));
        this.router.post('/register', checkSchema(registerUserSchema), this.controller.register.bind(this.controller));
        this.router.get('/get-profile', passport.authenticate('jwt', { session: false }), this.controller.getProfile.bind(this.controller));
        this.router.put('/update-profile', passport.authenticate('jwt', { session: false }), this.controller.updateProfile.bind(this.controller));
        return this.router;
    }
}