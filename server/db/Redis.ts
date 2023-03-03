import redis, { createClient } from 'redis';
import { AppConfig } from '../config';
import { isEmpty } from 'lodash';
const { port, host, docker, url, dockerUrl } = AppConfig.get('redis');
import session from 'express-session'


export default class Redis {
    // Configs
    static shared: Redis;
    params: any;
    redisPort: any;
    client: any;


    async connect() {
        try {
            this.client = createClient({
                url: docker ? dockerUrl : url
            });
            await this.client.connect(url)
            console.log('Redis Client Success')
        } catch (error) {
            console.log('Redis Client Error', error)
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