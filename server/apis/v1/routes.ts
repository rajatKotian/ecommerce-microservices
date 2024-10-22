import * as express from 'express';
import Auth from '../../services/Auth/router';
import Cart from '../../services/Cart/router';
import Inventory from '../../services/Inventory/router';



let router = express.Router();


router.use('/v1/auth', Auth);
router.use('/v1/cart', Cart);
router.use('/v1/inventory', Inventory);

export default router;
