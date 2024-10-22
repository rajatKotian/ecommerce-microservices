import * as express from 'express';
import { RestController } from "../controllers";
import { AppConfig } from '../../../config';
import { Services } from '../../../utils/constants';
import { DatabaseClient } from '../utils/dbClient';


let router = express.Router();
const controller = new RestController();

router.get('/', controller.testRoute);


/* List Items in the cart (CACHEABLE) */
router.get('/items', controller.listCart);

/* Add items to the cart  (CACHING TOUCHPOINT) */
router.post('/items', controller.addProductsToCart);

/* Update items in the cart  (CACHING TOUCHPOINT) */
router.patch('/items', controller.updateProductsInCart);

/* Delete items from the cart (CACHING TOUCHPOINT) */
router.delete('/items', controller.deleteProductsFromCart);

export default router;