import express from 'express'
import passport from 'passport'
import morgan from 'morgan'
import fs from 'fs'
import bodyParser from 'body-parser'
import path from 'path'
import session from 'express-session'

import { AppConfig } from './config'
import routes from './apis/v1/routes';
import { RedisClient } from './db';
import Logger from './utils/helpers/Logger'
import RabbitMQ from './utils/rabbitMQClient';


//Express App declaration
let app = express()
let expressPort = AppConfig.get("express:port") || 3000
let serverUrl = AppConfig.get('baseUrl:rabbitMQUrl');


//Client Declarations
RedisClient.startServer();
RabbitMQ.startServer(serverUrl);


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
    RedisClient.setRedisMiddleware()
);

app.use(
    RedisClient.setRedisMiddleware(),
    session(expressSession),
    passport.initialize(),
    passport.session(),
    morgan('dev', { stream: accessLogStream }),
    routes
);

app.get('/', (req, res) => {
    res.send({ success: true, msg: "Routes changes is working fine really" })
})
if (AppConfig.get('environment') === 'production') {
    app.set('trust proxy', 1)
    expressSession.cookie.secure = true
}

app.listen(expressPort, async () => {
    Logger.info(`Server is listening on ${expressPort}`);
});


