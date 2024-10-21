import { Request } from "express";
import passport from "passport";
import passportJWT from "passport-jwt"
import passportLocal from 'passport-local'
import { AppConfig } from "../../../../config";
import { ERROR_MESSAGES, HttpErrorStatusCode } from "../../../../utils/constants";
import { APIError } from "../../../../utils/responseHandlers/error.helper";
import AuthRepository from "../../../Auth/repository/auth.repository";


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
                            false, HttpErrorStatusCode.BAD_REQUEST, true, ERROR_MESSAGES.INVALID_CREDENTIALS
                        ));
                    } else if (!token) {
                        return done(true, new APIError(
                            false, HttpErrorStatusCode.BAD_REQUEST, true, ERROR_MESSAGES.SESSION_EXPIRED
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