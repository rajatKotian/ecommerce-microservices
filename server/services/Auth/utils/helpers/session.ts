import { Request } from "express";
import jwt from "jsonwebtoken";
import { AppConfig } from "../../../../config";
import Logger from "../../../../utils/helpers/Logger";
const secretkey: string = AppConfig.get('passport:secret')
const expiry: string = AppConfig.get('passport:expiry')

export const initiateSession = async (req: any, data: {
    firstName: string;
    lastName: string;
    email: string;
}) => {
    try {
        Logger.info(`${data?.firstName} ${data?.lastName} ${data?.email}`)
        const redis = req.redisClient;

        const token = jwt.sign({
            name: `${data?.firstName} ${data?.lastName}`, email: data?.email
        }, secretkey, { expiresIn: expiry });
        await redis.setKey(data?.email, token);

        return token
    } catch (error) {
        Logger.error(error)

        throw error

    }
}