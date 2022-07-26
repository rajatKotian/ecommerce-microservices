export default class Logger {
    static log(...values: any) {
        return console.log(...values)
    }
}

const log = Logger.log
export { log }