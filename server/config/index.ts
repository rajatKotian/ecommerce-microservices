import config from './config'

export class AppConfig {
    static get(key: string): string {
        return config.get(key)
    }
    static set(key: string, value: any): string {
        return config.set(key, value)
    }

}