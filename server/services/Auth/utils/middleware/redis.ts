import Redis from "../../../../db/Redis";

export const redisMiddleware = (client: Redis) => {
    return (req: any, res: any, next: any) => {
        req.redisClient = req?.redisClient ?? Redis;
        next();
    }
}