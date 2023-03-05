import { Request } from "express";
import jwt from "jsonwebtoken";
import { AppConfig } from "../../../../config";
import { RedisClient } from "../../../../db";
import Logger from "../../../../utils/helpers/Logger";

export const initiateSession = (req: Request, data: {
    firstName: string;
    lastName: string;
    email: string;
}) => {
    const secretkey: string = AppConfig.get('passport:secret')
    const expiry: string = AppConfig.get('passport:expiry')
    Logger.info(`${data?.firstName} ${data?.lastName} ${data?.email}`)
    const token = jwt.sign({
        name: `${data?.firstName} ${data?.lastName}`, email: data?.email
    }, secretkey, { expiresIn: expiry });

    return token
}