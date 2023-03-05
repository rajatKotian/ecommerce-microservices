import express from 'express'
import passport from 'passport'
import morgan from 'morgan'
import fs from 'fs'
import bodyParser from 'body-parser'
import path from 'path'
import session from 'express-session'
import crypto from 'crypto'

import { AppConfig } from './config'
import routes from './apis/routes'
import { DatabaseClient, RedisClient } from './db'
import { redisMiddleware } from './services/Auth/utils/middleware/redis'



//Express App declaration
let app = express()
let port = AppConfig.get("express:port") || 3000


//Client Declarations
let redis = new RedisClient()
RedisClient.shared = redis
let mongoDB = new DatabaseClient()

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoDB.connect().then(async res => {

    const expressSession = {
        secret: AppConfig.get('passport:secret'),
        resave: true,
        saveUninitialized: true,
        cookie: { secure: true }
    };

    await redis.connect()
    let accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })

    //Set middleware;
    app.use(
        redisMiddleware(redis),
        session(expressSession),
        passport.initialize(),
        passport.session(),
        morgan('combined', { stream: accessLogStream }),
        routes
    );

    app.get('/', (req, res) => {
        res.send({ success: true, msg: "Routes changes is working fine really" })
    })
    if (AppConfig.get('environment') === 'production') {
        app.set('trust proxy', 1) // trust first proxy
        expressSession.cookie.secure = true // serve secure cookies
    }

    app.listen(port, async () => {
        console.log(`Server is listening on ${port}`);
    });
})

export default app

