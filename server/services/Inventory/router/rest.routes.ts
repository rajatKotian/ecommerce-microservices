
import * as express from 'express';
import { RestController } from "../controllers";
let router = express.Router();

let controller = new RestController();


/* List Products in the cart (CACHEABLE) */
router.get('/products', controller.listProducts);

export default router;