"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const config_1 = require("../config");
const { port, password } = config_1.AppConfig.get('redis');
class Redis {
    constructor() {
        this.redisClient = (0, redis_1.createClient)();
    }
    async connect() {
        const client = (0, redis_1.createClient)();
        client.on('error', (error) => {
            console.log('Redis Client Error', error);
        }).on('connect', () => {
            console.log('Redis Client Success');
        });
        await client.connect();
    }
}
exports.default = Redis;
