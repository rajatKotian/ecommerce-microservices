import Mongoose from 'mongoose';
import { AppConfig } from '../../../../config';
import Logger from '../../../../utils/helpers/Logger';
import { Services } from '../../../../utils/constants';


/**
 * DatabaseClient class responsible for managing database connections.
 */
export default class DatabaseClient {
    private uri: string;
    private service: string;

    /**
   * Constructs a new DatabaseClient instance.
   * @param uri - The URI of the database.
   * @param service - The service name associated with the database.
   */
    constructor (uri: string, service: Services) {
        this.uri = uri;
        this.service = service;
    }

    /**
    * Starts the database server.
    * Attempts to connect to the database using the provided URI and service.
    * Logs success or failure messages based on the connection outcome.
    */
    public startDBServer() {
        try {
            const { service, uri } = this;
            let { options } = AppConfig.get("mongoDB");
            Mongoose.set('strictQuery', true);
            Mongoose.createConnection(uri, options, (error) => {

                Logger.info(`${service} connection initiated`);
                if (error) {
                    Logger.info(`Mongodb connection Failed for Service ${service}`);
                }
                else {
                    Logger.info(`Mongodb connection Successful for Service ${service}`);
                }
            });
        } catch (error) {
            Logger.error(JSON.stringify(error));
            throw error;
        }
    }

}


