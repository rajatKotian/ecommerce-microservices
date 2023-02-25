import Mongoose from 'mongoose'
import { AppConfig } from '../config'

export default class DatabaseClient {
    connect(): Promise<any> {
        return new Promise((resolve, reject) => {
            let { uri, options, dockerUri } = AppConfig.get("mongoDB")
            Mongoose.set('strictQuery', true);
            Mongoose.connect(uri, options, (error) => {
                if (error) {
                    console.log("Mongodb connection Unsuccessful")
                    reject(error);
                }
                else {
                    console.log("Mongodb connection Successful")
                    resolve({});
                }
            })
        })
    }
}


