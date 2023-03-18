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
import Logger from './utils/helpers/Logger'
import { GRPCServer } from './utils/servers/GRPCServer'



//Express App declaration
let app = express()
let port = AppConfig.get("express:port") || 3000


//Client Declarations
RedisClient.startServer()
DatabaseClient.startDBServer()
GRPCServer.startServer()


// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const expressSession = {
    secret: AppConfig.get('passport:secret'),
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
};

let accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })

//Set middleware;
app.use(
    RedisClient.setRedisMiddleware(),
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
    app.set('trust proxy', 1)
    expressSession.cookie.secure = true
}

app.listen(port, async () => {
    Logger.info(`Server is listening on ${port}`);
});

export default app

