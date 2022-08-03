"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const config_1 = require("../config");
const { port, password } = config_1.AppConfig.get('redis');
class Redis {
    async connect() {
        let host = "host.docker.internal";
        this.client = (0, redis_1.createClient)({
            url: `redis://default@${host}:6379`
        });
        this.client.on('error', (error) => {
            console.log('Redis Client Error', error);
        }).on('connect', () => {
            console.log('Redis Client Success');
        });
        await this.client.connect();
    }
}
exports.default = Redis;
