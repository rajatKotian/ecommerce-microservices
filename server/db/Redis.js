"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const config_1 = require("../config");
const { port, host, docker, url, dockerUrl } = config_1.AppConfig.get('redis');
class Redis {
    async connect() {
        this.client = (0, redis_1.createClient)({
            url: docker ? dockerUrl : url
        });
        this.client.connect().then(() => {
            console.log('Redis Client Success');
        }).catch((error) => {
            console.log('Redis Client Error', error);
        });
    }
}
exports.default = Redis;
