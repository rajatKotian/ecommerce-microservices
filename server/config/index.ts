import config from './config'

export class AppConfig {

    //Get a key value in the environment variable
    static get(key: string): string {
        return config.get(key)
    }

    //Set a key value in the environment variable
    static set(key: string, value: any): string {
        return config.set(key, value)
    }
}