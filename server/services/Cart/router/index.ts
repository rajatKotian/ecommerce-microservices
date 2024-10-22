
import * as express from 'express';
import { AppConfig } from '../../../config';
import { Services } from '../../../utils/constants';
import { DatabaseClient } from '../utils/dbClient';
import routes from './rest.routes';

let router = express.Router();

const uri = AppConfig.get("mongoDB:service:cart");
const dbClient = new DatabaseClient(uri, Services.CART);
dbClient.startDBServer();


router.use('/', routes);

export default router;