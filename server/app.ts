import express from 'express'
import { AppConfig } from './config'
import DatabaseClient from './db'


//Express App declaration
let app = express()
let port = AppConfig.get("express:port") || 3000



app.get('/', (req, res) => {
    res.send("Every thing is not fine")
})

app.listen(port, async () => {
    await DatabaseClient.connect()
    console.log(`server is listening on ${port}`);
});



