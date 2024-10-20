import Mongoose from 'mongoose'
import { AppConfig } from '../config'
import Logger from '../utils/helpers/Logger';

export default class DatabaseClient {
    private static server: DatabaseClient;

    private constructor() {
        return new Promise((resolve, reject) => {
            let { uri, options } = AppConfig.get("mongoDB")
            Mongoose.set('strictQuery', true);
            Mongoose.connect(uri, options, (error) => {
                if (error) {
                    Logger.info("Mongodb connection Failed")
                    reject(error);
                }
                else {
                    Logger.info("Mongodb connection Successful")
                    resolve({});
                }
            })
        })
    }

    public static startDBServer(): DatabaseClient {
        if (!this.server) {
            this.server = new DatabaseClient()
        }
        return this.server;
    }
}


