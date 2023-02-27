import passport from "passport";
import passportJWT from "passport-jwt"
import passportLocal from 'passport-local'
import { AppConfig } from "../../../../config";
import { HTTP_ERROR_STATUS_CODE, HTTP_SUCCESS_STATUS_CODE } from "../../../../utils/constants";
import { APIError } from "../../../../utils/responseHandlers/error.helper";
import { APISuccess } from "../../../../utils/responseHandlers/success.helper";
import AuthRepository from "../../repository/auth.repository";


const JWTStrategy = passportJWT.Strategy;
const LocalStategy = passportLocal.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const Auth = new AuthRepository();

passport.use(
    new LocalStategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async function (email, password, cb) {
            try {
                const user = await Auth.getOne({
                    email
                });
                if (!user) {
                    return cb(new APIError(
                        false, HTTP_ERROR_STATUS_CODE.BAD_REQUEST, true, 'Invalid username or password'
                    ));
                }
                return new APISuccess(
                    true, HTTP_SUCCESS_STATUS_CODE.ACCEPTED, 'Login Successful'
                )
            } catch (error) {
                throw new APIError(
                    false, HTTP_ERROR_STATUS_CODE.BAD_REQUEST, true, 'Invalid username or password'
                )
            }
        }
    )
)
passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: AppConfig.get('passport:secret'),
        },
        function (jwtPayload, done) {
            try {
                return done(null, jwtPayload);
            } catch (error) {
                done(error);
            }
        }
    )
)

export default passport;