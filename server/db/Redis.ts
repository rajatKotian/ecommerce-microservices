import { createClient } from 'redis';
import { AppConfig } from '../config';
const { url, port, password } = AppConfig.get('redis');
import Logger from '../utils/helpers/Logger';
import { redisMiddleware } from '../services/Auth/utils/middleware/redis';


/**
 * Redis class for interacting with Redis database.
 */
export default class Redis {
    // Configs
    private static server: Redis;
    private client: any;

    private constructor() {
        this.connect();
    }

    /**
     * Connects to the Redis server.
     */
    async connect() {
        try {
            this.client = createClient({
                socket: {
                    host: url,
                    port: port
                },
                password
            });
            await this.client.connect(url)
            Logger.info('Redis Client Success')
        } catch (error) {
            Logger.error('Redis Client Error', error)
        }

    }
    /**
     * Starts the Redis server instance.
     * @returns {Redis} The Redis server instance.
     */
    public static startServer() {
        if (!this.server) {
            this.server = new Redis();
        }
        return this.server;
    }

    /**
     * Sets up the Redis middleware.
     * @returns {Function} The Redis middleware function.
     */
    public static setRedisMiddleware() {
        return redisMiddleware(this.server);
    }

    /**
     * Sets a key-value pair in the Redis database.
     * @param {string} key The key to set.
     * @param {any} value The value to set.
     */
    async setKey(key: string, value: any) {
        await this.client.set(key, value);
    }

    /**
     * Gets the value associated with a key in the Redis database.
     * @param {string} key The key to retrieve.
     * @returns {Promise<any>} The value associated with the key.
     */
    async getKey(key: string) {
        return await this.client.get(key);
    }

    /**
     * Sets an expiration time for a key in the Redis database.
     * @param {string} key The key to set the expiration time for.
     * @param {any} time The expiration time in seconds.
     */
    async expire(key: string, time: any) {
        await this.client.expire(key, parseInt(time));
    };
}