"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const config_1 = require("../config");
const { port } = config_1.AppConfig.get('redis');
class Redis {
    constructor() {
        this.connect();
    }
    async connect() {
        const client = (0, redis_1.createClient)();
        client.on('error', (err) => {
            console.log('Redis Client Error', err);
        }).on('connect', () => {
            console.log('Redis Client Success');
        });
    }
}
exports.default = Redis;
