
import * as express from 'express';
import { AppConfig } from '../../../config';
import { Services } from '../../../utils/constants';
import { DatabaseClient } from '../utils/dbClient';
import { AuthRouter } from './rest.routes';


// Start the database server connection
const uri = AppConfig.get("mongoDB:service:auth");
const dbClient = new DatabaseClient(uri, Services.AUTH);
dbClient.startDBServer();

/**  
 * Create a new Express router instance
 * Initialize routes using the Inventory Router class instance 
 * Attach the initialized routes to the base path  
*/
let router = express.Router();
let routes = new AuthRouter().initializeRoutes();
router.use('/', routes);

// Export the configured router as the default export
export default router;