import fs from 'fs'
import nconf from 'nconf'
import { Helper } from '../utils/helpers'

let environment = process.env.NODE_ENV || "development"
let configClient = nconf.argv()
    .env()
    .file({ file: require.resolve('./environment/' + environment + '.json') })


export default configClient