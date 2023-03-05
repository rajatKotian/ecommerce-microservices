import redis, { createClient } from 'redis';
import { AppConfig } from '../config';
import { isEmpty } from 'lodash';
const { port, host, docker, url, dockerUrl } = AppConfig.get('redis');
import session from 'express-session'
import Logger from '../utils/helpers/Logger';


export default class Redis {
    // Configs
    static shared: Redis;
    private client: any;


    async connect() {
        try {
            this.client = createClient({
                url: docker ? dockerUrl : url
            });
            await this.client.connect(url)
            Logger.info('Redis Client Success')
        } catch (error) {
            Logger.error('Redis Client Error', error)
        }

    }

    async setKey(key: string, value: any) {
        await this.client.set(key, value);
    }

    async getKey(key: string) {
        return await this.client.get(key);
    }

    async expire(key: string, time: any) {
        await this.client.expire(key, parseInt(time));
    };
}