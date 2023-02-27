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
        this.client = createClient({
            url: docker ? dockerUrl : url
        });

        this.client.connect(url).then(() => {
            console.log('Redis Client Success')
        }).catch((error: any) => {
            console.log('Redis Client Error', error)
        })

    }

}