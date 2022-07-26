import express from 'express'
import { AppConfig } from './config'


//Express App declaration
let app = express()
let port = AppConfig.get("express:port")



app.get('/', (req, res) => {
    res.send("Every thing is fine")
})

app.listen(port, async () => {
    console.log(`server is listening on ${port}`);
});



