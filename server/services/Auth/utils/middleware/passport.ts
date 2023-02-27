import passport from "passport";
import passportJWT from "passport-jwt"
import { AppConfig } from "../../../../config";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

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