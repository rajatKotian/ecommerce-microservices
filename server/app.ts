import express from 'express'
import { AppConfig } from './config'
import { DatabaseClient, RedisClient } from './db'
import { log } from './utils/helpers/Logger'


//Express App declaration
let app = express()
let port = AppConfig.get("express:port") || 3000
let { redisPort } = AppConfig.get("redis")


//Client Declarations
let redis = new RedisClient()
let mongoDB = new DatabaseClient()

mongoDB.connect().then(async res => {
    await redis.connect()
    app.get('/', (req, res) => {
        res.send({ success: true, msg: "Routes changes is working fine" })
    })

    app.listen(port, async () => {
        console.log(`server is listening on ${port}`);
    });
}).catch()

