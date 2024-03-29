import assert from "assert";
import { APIError } from "../../../utils/responseHandlers/error.helper";
import { IUser } from "../interface/request";
import AuthRepository from "../repository/auth.repository";
import { APISuccess } from "../../../utils/responseHandlers/success.helper";
import { ERROR_MESSAGES, HTTP_ERROR_STATUS_CODE, HTTP_SUCCESS_STATUS_CODE, LOGGER_CONSTANTS } from "../../../utils/constants";
import Logger from "../../../utils/helpers/Logger";
import { Request } from "express";
import { initiateSession } from "../utils/helpers/session";
import { IAuthService } from "../interface/service";
import { sendEmailVerificationLink } from "../utils/helpers/emailers";
import { NodeMailer } from "../../../utils/emailerClient";
import { IRepository } from "../../../utils/interface/repository";
import { IServiceLayerResponse } from "../../../utils/interface/response";

export default class AuthServiceLayer implements IAuthService {
    private authRepository: IRepository;
    private sendEmail = NodeMailer.sendMail;
    constructor() {
        this.authRepository = new AuthRepository();
        this.registerNewUser = this.registerNewUser.bind(this);
        this.updateProfileDetails = this.updateProfileDetails.bind(this);
        this.getProfileDetails = this.getProfileDetails.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }
    updateProfileDetails = async (req: Request, args: IUser): Promise<IServiceLayerResponse> => {
        try {
            const userInfo: IUser | undefined = req?.user
            const id: string = userInfo?._id || ''
            if (args.password) {
                return new APISuccess(
                    false, HTTP_ERROR_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGES.CANNOT_UPDATE_PASSWORD
                );
            }
            const user = await this.authRepository.updateOne(id, args, { new: true });
            return new APISuccess(
                true, HTTP_SUCCESS_STATUS_CODE.CREATED, user
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
    getProfileDetails = async (req: Request): Promise<IServiceLayerResponse> => {
        try {
            const userInfo: IUser | undefined = req?.user
            const user = await this.authRepository.getOne({ email: userInfo?.email });
            return new APISuccess(
                true, HTTP_SUCCESS_STATUS_CODE.CREATED, user
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

    registerNewUser = async (req: Request, args: IUser): Promise<IServiceLayerResponse> => {
        try {
            const userExist = await this.authRepository.exists({ email: args?.email });
            if (userExist) {
                return new APISuccess(
                    false, HTTP_ERROR_STATUS_CODE.FORBIDDEN, ERROR_MESSAGES.USER_EXISTS
                );
            }
            const data = await this.authRepository.create(args);

            // Initiate Session for new user
            const token = await initiateSession(req, {
                firstName: data?.firstName,
                lastName: data?.lastName,
                email: data?.email,
            });

            // Send Verification Email
            sendEmailVerificationLink(data?.email, this.sendEmail);

            return new APISuccess(
                true, HTTP_SUCCESS_STATUS_CODE.CREATED, token
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

    loginUser = async (req: Request, args: { email: string, password: string }): Promise<IServiceLayerResponse> => {
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

            const token = await initiateSession(req, {
                firstName: data?.firstName,
                lastName: data?.lastName,
                email: args?.email,
            });

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
