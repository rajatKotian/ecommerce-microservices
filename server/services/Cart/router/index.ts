
import * as express from 'express';
import { RestController } from "../controllers";

let router = express.Router();

let controller = new RestController();
router.get('/', controller.testRoute);

/*List by all at once Completed, Cancelled, In progress (CACHEABLE)  */
router.get('/orders', controller.testRoute);

/* List Items in the cart (CACHEABLE) */
router.get('/cart', controller.testRoute);

/* Add items to the cart  (CACHING TOUCHPOINT) */
router.put('/cart', controller.testRoute);

/* Delete items from the cart (CACHING TOUCHPOINT) */
router.delete('/cart', controller.testRoute);



/* List Items in the Wishlist (CACHEABLE) */
router.get('/wish-list', controller.testRoute);

/* Add items to the Wishlist (CACHING TOUCHPOINT */
router.put('/wish-list', controller.testRoute);

/* Delete items from the Wishlist (CACHING TOUCHPOINT */
router.delete('/wish-list', controller.testRoute);


export default router;