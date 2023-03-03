import assert from "assert";
import { APIError } from "../../../utils/responseHandlers/error.helper";
import { IRepository } from "../interface/repository";
import { IUser } from "../interface/request";
import { IServiceLayerResponse } from "../interface/response";
import { User } from "../modal/schemas";
import AuthRepository from "../repository/auth.repository";
import { APISuccess } from "../../../utils/responseHandlers/success.helper";
import { ERROR_MESSAGES, HTTP_ERROR_STATUS_CODE, HTTP_SUCCESS_STATUS_CODE, LOGGER_CONSTANTS } from "../../../utils/constants";
import Logger from "../../../utils/helpers/Logger";
import passport from "passport";
import jwt from "jsonwebtoken";
import { AppConfig } from "../../../config";

export default class AuthServiceLayer {
    private authRepository: IRepository;
    constructor() {
        this.authRepository = new AuthRepository();
        this.registerNewUser = this.registerNewUser.bind(this);
    }

    registerNewUser = async (args: IUser): Promise<IServiceLayerResponse> => {
        try {
            console.log(args);
            const userExist = await this.authRepository.exists({ email: args?.email });
            if (userExist) {
                return new APISuccess(
                    false, HTTP_ERROR_STATUS_CODE.FORBIDDEN, ERROR_MESSAGES.USER_EXISTS
                );
            }
            const data = await this.authRepository.create(args);
            return new APISuccess(
                true, HTTP_SUCCESS_STATUS_CODE.CREATED, data
            );

        } catch (error) {
            Logger.error(JSON.stringify(error));
            throw new APIError(
                false,
                HTTP_ERROR_STATUS_CODE.INTERNAL_SERVER,
                true,
                ERROR_MESSAGES.INTERNAL_SERVER_ERROR
            );
        }
    }

    loginUser = async (args: { email: string, password: string }): Promise<IServiceLayerResponse> => {
        try {
            const secretkey = AppConfig.get('passport:secret')
            const data: any = await this.authRepository.getOne({
                email: args?.email,
                isActive: true
            });
            await data.checkPassword(args?.password)

            if (!args.email) {
                new APISuccess(
                    false, HTTP_ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGES.EMAIL_VALIDATION
                );
            }
            else if (!args.password) {
                return new APISuccess(
                    false, HTTP_ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGES.PASSWORD_VALIDATION
                );
            }
            else {
                passport.authenticate("local", function (err: any, user: IUser) {
                    if (err) {
                        return new APISuccess(
                            false, HTTP_ERROR_STATUS_CODE.INTERNAL_SERVER, ERROR_MESSAGES.INTERNAL_SERVER_ERROR
                        );
                    }
                    else {
                        if (!user) {
                            return new APISuccess(
                                false, HTTP_ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGES.INVALID_CREDENTIALS
                            );
                        }
                        else {
                            const token = jwt.sign({ userId: user._id, username: user.email }, secretkey, { expiresIn: "24h" });
                            return new APISuccess(
                                false, HTTP_SUCCESS_STATUS_CODE.ACCEPTED, { token }
                            );
                        }
                    }
                })
            }


            return new APISuccess(
                true, HTTP_SUCCESS_STATUS_CODE.CREATED, data
            );

        } catch (error) {
            Logger.error(JSON.stringify(error));
            throw new APIError(
                false,
                HTTP_ERROR_STATUS_CODE.INTERNAL_SERVER,
                true,
                ERROR_MESSAGES.INTERNAL_SERVER_ERROR
            );
        }
    }
}
