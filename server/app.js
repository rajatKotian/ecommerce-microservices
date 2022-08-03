"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const db_1 = require("./db");
//Express App declaration
let app = (0, express_1.default)();
let port = config_1.AppConfig.get("express:port") || 3000;
let { redisPort } = config_1.AppConfig.get("redis");
//Client Declarations
let redis = new db_1.RedisClient();
let mongoDB = new db_1.DatabaseClient();
mongoDB.connect().then(async (res) => {
    await redis.connect();
    app.get('/', (req, res) => {
        res.send({ success: true, msg: "Routes changes is working fine" });
    });
    app.listen(port, async () => {
        console.log(`server is listening on ${port}`);
    });
}).catch();
