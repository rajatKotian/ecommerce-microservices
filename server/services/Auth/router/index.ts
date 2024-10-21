
import * as express from 'express'
import routes from './rest.routes';

let router = express.Router();

router.use('/', routes);

export default router;