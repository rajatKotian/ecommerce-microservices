import * as express from 'express'
import Auth from '../services/Auth'



let router = express.Router();


router.use('/auth', Auth)

export default router;
