import express from 'express'
import { AppConfig } from './config'
import DatabaseClient from './db'


//Express App declaration
let app = express()
let port = AppConfig.get("express:port") || 3000



app.get('/', (req, res) => {
    res.send({ success: true, msg: "This route is working fine, ofcourse" })
})

app.listen(port, async () => {
    await DatabaseClient.connect()
    console.log(`server is listening on ${port}`);
});



