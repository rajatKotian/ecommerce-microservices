import assert from "assert";
import { APIError } from "../../../utils/errorHandlers/base.error.helper";
import Logger from "../../../utils/helpers/Logger";
import { IRepository } from "../interface/repository";
import { IUser } from "../interface/request";
import { IServiceLayerResponse, IRepositoryLayerResponse } from "../interface/response";
import { User } from "../modal/schemas";
import AuthRepository from "../repository/auth.repository";

export default class AuthServiceLayer {
    private authRepository: IRepository;
    constructor() {
        this.authRepository = new AuthRepository();
        this.registerNewUser = this.registerNewUser.bind(this);
    }

    registerNewUser = async (args: IUser): Promise<IRepositoryLayerResponse> => {
        try {
            let response: IRepositoryLayerResponse;
            const data = await this.authRepository.create(args);
            response = { success: true, data }
            return response;

        } catch (error) {
            Logger.error(JSON.stringify(error));
            throw new APIError(false, 400, true, 'Internal Server Error');

        }
    }
}
