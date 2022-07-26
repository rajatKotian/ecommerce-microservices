import config from './config'

export class AppConfig {

    //Get a key value in the environment variable
    static get(key: string): any {
        return config.get(key)
    }

    //Set a key value in the environment variable
    static set(key: string, value: any): any {
        return config.set(key, value)
    }
}