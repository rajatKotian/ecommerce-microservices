import redis, { createClient } from 'redis';
import { AppConfig } from '../config';
import { log } from '../utils/helpers/Logger';
import { isEmpty } from 'lodash';
const { port, password } = AppConfig.get('redis');


export default class Redis {
    // Configs
    static shared: Redis;
    params: any;
    redisPort: any;
    redisClient = createClient()


    async connect() {

        const client = createClient();


        client.on('error', (error: any) => {
            console.log('Redis Client Error', error)
        }).on('connect', () => {
            console.log('Redis Client Success')
        });

        await client.connect();
    }

}