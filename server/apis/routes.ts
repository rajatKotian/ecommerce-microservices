import * as express from 'express'
import Auth from '../services/Auth'



let router = express.Router();


router.use('/v1/auth', Auth)

export default router;
