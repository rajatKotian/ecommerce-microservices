import express from 'express'
import { AppConfig } from './config'
import routes from './apis/routes'
import { DatabaseClient, RedisClient } from './db'
import bodyParser from 'body-parser'


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
    await redis.connect()
    app.get('/', (req, res) => {
        res.send({ success: true, msg: "Routes changes is working fine really" })
    })

    app.use(routes)

    app.listen(port, async () => {
        console.log(`server is listening on ${port}`);
    });
}).catch()

export default app

