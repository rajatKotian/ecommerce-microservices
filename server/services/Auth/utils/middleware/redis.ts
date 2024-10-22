import Redis from "../../../../db/Redis";
import Logger from "../../../../utils/helpers/Logger";

export const redisMiddleware = (client: Redis) => {
    return (req: any, res: any, next: any) => {
        req.redisClient = req?.redisClient ?? client;
        next();
    }
}