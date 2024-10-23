import jwt from "jsonwebtoken";
import { AppConfig } from "../../../../config";
import Logger from "../../../../utils/helpers/Logger";
import { IUserModel } from "../../interface/model";
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
    user: IUserModel;
}) => {
    try {
        const { firstName, lastName, email } = data.user;
        Logger.info(`${firstName} ${lastName} ${email}`);

        const redis = req.redisClient;

        const token = jwt.sign({
            user: data.user,
        }, secretkey, { expiresIn: expiry });

        await redis.setKey(email, token);

        return token;
    } catch (error) {
        Logger.error(error);
        throw error;

    }
};