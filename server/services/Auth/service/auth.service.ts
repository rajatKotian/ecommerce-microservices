import assert from "assert";
import { APIError } from "../../../utils/responseHandlers/error.helper";
import { IUser } from "../interface/request";
import AuthRepository from "../repository/auth.repository";
import { APISuccess } from "../../../utils/responseHandlers/success.helper";
import { ERROR_MESSAGES, HttpErrorStatusCode, HttpSuccessStatusCode } from "../../../utils/constants";
import Logger from "../../../utils/helpers/Logger";
import { Request } from "express";
import { initiateSession } from "../utils/helpers/session";
import { IAuthService } from "../interface/service";
import { sendEmailVerificationLink } from "../utils/helpers/emailers";
import { NodeMailer } from "../../../utils/emailerClient";
import { IRepository } from "../../../utils/interface/repository";
import { IServiceLayerResponse } from "../../../utils/interface/response";
import { checkPassword } from "../../../utils/helpers";

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
    updateProfileDetails = async (req: Request, args: Partial<IUser>): Promise<IServiceLayerResponse> => {
        try {
            const userInfo: IUser = req?.user as IUser
            const id: string = userInfo?._id || ''
            if (args.password) {
                return new APISuccess(
                    false, HttpErrorStatusCode.BAD_REQUEST, ERROR_MESSAGES.CANNOT_UPDATE_PASSWORD
                );
            }
            const user = await this.authRepository.updateOne(id, args, { new: true });
            return new APISuccess(
                true, HttpSuccessStatusCode.CREATED, user
            );
        } catch (error) {
            Logger.error(JSON.stringify(error));
            throw new APIError(
                false,
                HttpErrorStatusCode.INTERNAL_SERVER,
                true,
                ERROR_MESSAGES.INTERNAL_SERVER_ERROR
            );
        }
    }
    getProfileDetails = async (req: Request): Promise<IServiceLayerResponse> => {
        try {
            const userInfo: IUser = req?.user as IUser
            const user = await this.authRepository.getOne({ email: userInfo?.email });
            return new APISuccess(
                true, HttpSuccessStatusCode.OK, user
            );
        } catch (error) {
            Logger.error(JSON.stringify(error));
            throw new APIError(
                false,
                HttpErrorStatusCode.INTERNAL_SERVER,
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
                    false, HttpErrorStatusCode.FORBIDDEN, ERROR_MESSAGES.USER_EXISTS
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
                true, HttpSuccessStatusCode.CREATED, token
            );

        } catch (error) {
            Logger.error(JSON.stringify(error));
            throw new APIError(
                false,
                HttpErrorStatusCode.INTERNAL_SERVER,
                true,
                ERROR_MESSAGES.INTERNAL_SERVER_ERROR
            );
        }
    }

    loginUser = async (req: Request, args: { email: string, password: string }): Promise<IServiceLayerResponse> => {
        try {
            const data: IUser = await this.authRepository.getOne({
                email: args?.email,
                isActive: true
            });
            const results = await checkPassword(args?.password, data.password as string);
            if (!results) {
                return new APISuccess(
                    false, HttpErrorStatusCode.NOT_FOUND, ERROR_MESSAGES.INCORRECT_PASSWORD
                );
            }

            const token = await initiateSession(req, {
                firstName: data.firstName as string,
                lastName: data.lastName as string,
                email: args?.email,
            });
            console.log({ token });
            return new APISuccess(
                true, HttpSuccessStatusCode.ACCEPTED, { token }
            );

        } catch (error) {
            Logger.error(JSON.stringify(error));
            throw new APIError(
                false,
                HttpErrorStatusCode.INTERNAL_SERVER,
                true,
                ERROR_MESSAGES.INTERNAL_SERVER_ERROR
            );
        }
    }
}
