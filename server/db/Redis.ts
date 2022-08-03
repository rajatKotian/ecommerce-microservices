import redis, { createClient } from 'redis';
import { AppConfig } from '../config';
import { log } from '../utils/helpers/Logger';
const { port } = AppConfig.get('redis');


export default class Redis {
    // Configs
    static shared: Redis;
    params: any;
    redisPort: any;
    constructor() {
        this.connect()
    }

    async connect() {

        const client = createClient();

        client.on('error', (err) => {
            console.log('Redis Client Error', err)
        }).on('connect', () => {
            console.log('Redis Client Success')
        });


    }

}