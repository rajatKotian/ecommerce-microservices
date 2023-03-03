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
import Redis from "../../../db/Redis";

export default class AuthServiceLayer {
    private authRepository: IRepository;
    private secretkey: string = AppConfig.get('passport:secret')

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
            const data: any = await this.authRepository.getOne({
                email: args?.email,
                isActive: true
            });
            const checkPassword = await data.checkPassword(args?.password)
            if (!checkPassword) {
                return new APISuccess(
                    false, HTTP_ERROR_STATUS_CODE.NOT_FOUND, ERROR_MESSAGES.INCORRECT_PASSWORD
                );
            }

            const token = jwt.sign({
                name: `${data?.firstName} ${data?.lastName}`, email: args?.email
            }, this.secretkey, { expiresIn: "24h" });

            return new APISuccess(
                true, HTTP_SUCCESS_STATUS_CODE.ACCEPTED, { token }
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
