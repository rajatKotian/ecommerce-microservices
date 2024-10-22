
import * as express from 'express';
import { RestController } from "../controllers";

let router = express.Router();

let controller = new RestController();
router.get('/', controller.testRoute);


/* List Items in the cart (CACHEABLE) */
router.get('/cart', controller.listCart);

/* Add items to the cart  (CACHING TOUCHPOINT) */
router.post('/cart', controller.addProductsToCart);

/* Update items in the cart  (CACHING TOUCHPOINT) */
router.patch('/cart', controller.updateProductsInCart);

/* Delete items from the cart (CACHING TOUCHPOINT) */
router.delete('/cart', controller.deleteProductsFromCart);

export default router;