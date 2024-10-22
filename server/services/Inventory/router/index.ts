
import * as express from 'express';
import { RestController } from "../controllers";
import { AppConfig } from '../../../config';
import { Services } from '../../../utils/constants';
import { DatabaseClient } from '../utils/dbClient';
import routes from './rest.routes';

let router = express.Router();

const uri = AppConfig.get("mongoDB:service:inventory");
const dbClient = new DatabaseClient(uri, Services.INVENTORY);
dbClient.startDBServer();

router.use('/', routes);

export default router;