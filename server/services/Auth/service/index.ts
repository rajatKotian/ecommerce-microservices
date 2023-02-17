import assert from "assert";
import { APIError } from "../../../utils/helpers/errorHandlers/base.error.helper";
import Logger from "../../../utils/helpers/Logger";
import { IRepository } from "../interface/repository";
import { IUser } from "../interface/request";
import { IServiceLayerResponse, IRepositoryLayerResponse } from "../interface/response";
import { User } from "../modal/schemas";
import AuthRepository from "../repository/auth.repository";

export default class AuthServiceLayer {
    authRepository: IRepository;
    constructor() {
        this.authRepository = new AuthRepository();
        this.createNewUser = this.createNewUser.bind(this);
    }

    createNewUser = async (args: IUser): Promise<IRepositoryLayerResponse> => {
        let response: IServiceLayerResponse;
        try {
            let response: IRepositoryLayerResponse;
            const data = await this.authRepository.create(args);
            assert.ok(false);
            response = { success: true, data }
            return response;

        } catch (error) {
            Logger.error(JSON.stringify(error));
            throw new APIError(false, 400, true);
        }
    }
}