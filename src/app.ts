import express from 'express'

//Express App declaration
let app = express()
let port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send("Every thing is fine")
})

app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});

