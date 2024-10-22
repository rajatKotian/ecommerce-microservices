
import * as express from 'express'
import routes from './rest.routes';
import { AppConfig } from '../../../config';
import { DatabaseClient } from '../../../db';
import { Services } from '../../../utils/constants';

let router = express.Router();

const uri = AppConfig.get("mongoDB:service:auth");
const dbClient = new DatabaseClient(uri, Services.AUTH);
dbClient.startDBServer();

router.use('/', routes);

export default router;