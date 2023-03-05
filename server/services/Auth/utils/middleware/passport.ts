import { Request } from "express";
import passport from "passport";
import passportJWT from "passport-jwt"
import passportLocal from 'passport-local'
import { AppConfig } from "../../../../config";
import Redis from "../../../../db/Redis";
import { ERROR_MESSAGES, HTTP_ERROR_STATUS_CODE, HTTP_SUCCESS_STATUS_CODE } from "../../../../utils/constants";
import Logger from "../../../../utils/helpers/Logger";
import { APIError } from "../../../../utils/responseHandlers/error.helper";
import { APISuccess } from "../../../../utils/responseHandlers/success.helper";
import AuthRepository from "../../repository/auth.repository";


const JWTStrategy = passportJWT.Strategy;
const LocalStategy = passportLocal.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const Auth = new AuthRepository();

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: AppConfig.get('passport:secret'),
            passReqToCallback: true
        },
        async (req: any,
            payload: { email: string },
            done: any) => {
            try {
                try {
                    const user = await Auth.getOne({
                        email: payload.email
                    });
                    const token = await req.redisClient.getKey(payload.email)
                    if (!user) {
                        return done(true, new APIError(
                            false, HTTP_ERROR_STATUS_CODE.BAD_REQUEST, true, ERROR_MESSAGES.INVALID_CREDENTIALS
                        ));
                    } else if (!token) {
                        return done(true, new APIError(
                            false, HTTP_ERROR_STATUS_CODE.BAD_REQUEST, true, ERROR_MESSAGES.SESSION_EXPIRED
                        ));
                    }
                    return done(false, user)
                } catch (error) {
                    const err = error || undefined;
                    throw done(true, err);
                }

            } catch (error) {
                done(error);
            }
        }
    )
)

export default passport;