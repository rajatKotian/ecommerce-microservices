import jwt from "jsonwebtoken";
import { AppConfig } from "../../../../config";
import Logger from "../../../../utils/helpers/Logger";
import { IUser } from "../../interface/request";
const secretkey: string = AppConfig.get('passport:secret');
const expiry: string = AppConfig.get('passport:expiry');

/**
 * Initiates a session for a user.
 *
 * @param req The request object.
 * @param data The user data.
 * @returns The JWT token.
 */
export const initiateSession = async (req: any, data: {
    user: IUser;
}) => {
    try {
        const { firstName, lastName, email } = data.user;
        Logger.info(`${firstName} ${lastName} ${email}`);

        const redis = req.redisClient;
        console.log(redis);
        const token = jwt.sign({
            user: data.user,
        }, secretkey, { expiresIn: expiry });

        await redis.setKey(email, token);

        return token;
    } catch (error) {
        Logger.error(error);
        console.log(error);
        throw error;

    }
};