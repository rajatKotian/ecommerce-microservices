
import * as express from 'express'
import { checkSchema, validationResult } from 'express-validator';
import { loginUserSchema, registerUserSchema } from './utils/routeValidation';
import { RestController } from "./controllers";
import passport from './utils/middleware/passport'
import { GRPCServer } from './utils/servers/GRPCServer';
import { ERROR_MESSAGES, HTTP_ERROR_STATUS_CODE } from '../../utils/constants';

let router = express.Router();
const server = GRPCServer.startServer();

let controller = new RestController()
router.get('/', passport.authenticate('jwt', { session: false }), controller.testRoute)
router.post('/login', checkSchema(loginUserSchema), controller.login)
router.post('/register', checkSchema(registerUserSchema), controller.register);
router.get('/get-profile', passport.authenticate('jwt', { session: false }), controller.getProfile);
router.put('/update-profile',
    passport.authenticate('jwt', { session: false }),
    controller.updateProfile
);


// //GRPC Calls
// router.post('/grpc/get-user', async (req: express.Request, res: express.Response) => {
//     const { id } = req.body;
//     server.grpcObjectClient.GetUser(
//         {
//             id,
//         },
//         (error: any, data: any) => {
//             if (error) {
//                 return res.status(HTTP_ERROR_STATUS_CODE.NOT_IMPLEMENTED).json({
//                     status: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
//                     message: error.message
//                 })
//             }
//             return res.status(201).json({
//                 status: "success",
//                 post: data
//             })
//         }
//     );
// });


export default router