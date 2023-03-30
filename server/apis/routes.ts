import * as express from 'express'
import Auth from '../services/Auth/router'
import Cart from '../services/Cart'



let router = express.Router();


router.use('/v1/auth', Auth)
router.use('/v1/cart', Cart)

export default router;
