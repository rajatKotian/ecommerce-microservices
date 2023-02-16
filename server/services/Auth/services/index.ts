import assert from "assert";
import Logger from "../../../utils/helpers/Logger";
import { IAuthService } from "../interface/common.interface";
import { IAuthRepository } from "../interface/repository";
import { IUser } from "../interface/request";
import { IServiceLayerResponse, IRepositoryLayerResponse } from "../interface/response";
import { User } from "../modal/schemas";
import AuthRepository from "../repository/auth.repository";

export default class ServiceLayer implements IAuthService {
    authRepository: IAuthRepository;
    constructor() {
        this.authRepository = new AuthRepository();
        this.createNewUser = this.createNewUser.bind(this);
    }

    createNewUser = async (args: IUser): Promise<IRepositoryLayerResponse> => {
        let response: IServiceLayerResponse;
        try {
            response = await this.authRepository.createUser(args);
        } catch (error) {
            Logger.error("This is an error log", JSON.stringify(error));
            response = { success: false }
        }
        return response
    }
}
