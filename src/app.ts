import express from 'express'

//Express App declaration
let app = express()



app.listen(2040, () => {
    console.log(`server is listening on 2040`);
});

// mongodb+srv://root:jxVrYmlq9HQo8vR1@cluster0.jcaqg.mongodb.net/?retryWrites=true&w=majority