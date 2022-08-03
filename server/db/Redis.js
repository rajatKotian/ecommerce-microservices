"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const Logger_1 = require("../utils/helpers/Logger");
class Redis {
    constructor() {
        this.redisClient = (0, redis_1.createClient)();
        this.connect();
    }
    connect() {
        (0, Logger_1.log)("hello world");
    }
}
exports.default = Redis;
