import winston from 'winston'
import { LOGGER_CONSTANTS } from "../constants"

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}
winston.addColors(LOGGER_CONSTANTS.COLORS)

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
)

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: '/Users/rajatkotian/Documents/my_porfolio_projects/ecommerce-microservices/server/logs/error.log',
        level: 'error',
    }),
    new winston.transports.File({ filename: 'logs/all.log' }),
]

const Logger = winston.createLogger({
    level: level(),
    levels: LOGGER_CONSTANTS.LEVELS,
    format,
    transports,
})

export default Logger
