import Mongoose from 'mongoose'
import { AppConfig } from '../config'
import { Helper } from '../utils/helpers'
import { log } from '../utils/helpers/Logger'

export default class DatabaseClient {

    static connect(): Promise<any> {
        return new Promise((resolve, reject) => {
            let { uri, options } = AppConfig.get("mongoDB")

            Mongoose.connect(uri, options, (error) => {
                error ? reject(error) : resolve({});
            })
        })
    }
}


