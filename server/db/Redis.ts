import redis, { createClient } from 'redis';
import { AppConfig } from '../config';
import { isEmpty } from 'lodash';
const { port, host, docker, url, dockerUrl } = AppConfig.get('redis');
import session from 'express-session'
import Logger from '../utils/helpers/Logger';
import { redisMiddleware } from '../services/Auth/utils/middleware/redis';


export default class Redis {
    // Configs
    private static server: Redis;
    private client: any;

    private constructor() {
        this.connect();
    }

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
    public static startServer() {
        if (!this.server) {
            this.server = new Redis();
        }
        return this.server;
    }
    public static setRedisMiddleware() {
        return redisMiddleware(this.server);
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