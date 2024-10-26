
import * as express from 'express';
import { AppConfig } from '../../../config';
import { Services } from '../../../utils/constants';
import { DatabaseClient } from '../utils/dbClient';
import { AuthRouter } from './rest.routes';

let router = express.Router();
const routes = new AuthRouter().initializeRoutes()

const uri = AppConfig.get("mongoDB:service:auth");
const dbClient = new DatabaseClient(uri, Services.AUTH);
dbClient.startDBServer();

router.use('/', routes);

export default router;