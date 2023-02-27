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



//Express App declaration
let app = express()
let port = AppConfig.get("express:port") || 3000


//Client Declarations
let redis = new RedisClient()
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

    app.get('/', (req, res) => {
        res.send({ success: true, msg: "Routes changes is working fine really" })
    })
    app.use(session(expressSession))

    app.use(passport.initialize());
    app.use(passport.session());

    if (AppConfig.get('environment') === 'production') {
        app.set('trust proxy', 1) // trust first proxy
        expressSession.cookie.secure = true // serve secure cookies
    }


    let accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })

    app.use(morgan('combined', { stream: accessLogStream }))

    app.use(routes)

    app.listen(port, async () => {
        console.log(`Server is listening on ${port}`);
    });
})

export default app

