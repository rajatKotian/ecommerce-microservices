import nconf from 'nconf'

let environment = process.env.NODE_ENV || "development"
let configClient = nconf.argv()
    .env()
    .file({ file: require.resolve('./environment/' + environment + '.json') })


export default configClient