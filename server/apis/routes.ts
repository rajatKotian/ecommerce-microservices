import * as express from 'express'
import Auth from '../services/Auth'
import Inventory from '../services/Inventory'



let router = express.Router();


router.use('/v1/auth', Auth)
router.use('/v1/inventory', Auth)

export default router;
