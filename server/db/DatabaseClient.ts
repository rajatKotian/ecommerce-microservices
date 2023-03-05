import Mongoose from 'mongoose'
import { AppConfig } from '../config'
import Logger from '../utils/helpers/Logger';

export default class DatabaseClient {
    connect(): Promise<any> {
        return new Promise((resolve, reject) => {
            let { uri, options, dockerUri } = AppConfig.get("mongoDB")
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
}


