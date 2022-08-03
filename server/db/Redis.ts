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
    client: any;


    async connect() {
        let host = "host.docker.internal"
        this.client = createClient({
            url: `redis://default@${host}:6379`
        });


        this.client.on('error', (error: any) => {
            console.log('Redis Client Error', error)
        }).on('connect', () => {
            console.log('Redis Client Success')
        });

        await this.client.connect();
    }

}