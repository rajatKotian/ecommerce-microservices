import Mongoose from 'mongoose'
import { AppConfig } from '../config'
import { Helper } from '../utils/helpers'
import { log } from '../utils/helpers/Logger'

export default class DatabaseClient {
    constructor() {
        // this.connect()
    }

    connect(): Promise<any> {
        return new Promise((resolve, reject) => {
            let { uri, options, dockerUri } = AppConfig.get("mongoDB")
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


