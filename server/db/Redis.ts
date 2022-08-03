import redis, { createClient } from 'redis';
import { log } from '../utils/helpers/Logger';

export default class Redis {
    static shared: Redis;
    params: any;
    redisClient = createClient()
    constructor() {
        this.connect()
    }

    connect() {
        log("hello world")
    }
}