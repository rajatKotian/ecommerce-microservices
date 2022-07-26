import fs from 'fs'
import nconf from 'nconf'


let environment = process.env.NODE_ENV || "development"

let configClient = nconf.argv()
    .env()
    .file({ file: `../config/environment/${environment}.json` })


export default configClient