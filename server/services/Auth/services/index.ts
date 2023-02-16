import assert from "assert";
import Logger from "../../../utils/helpers/Logger";
import { IAuthService } from "../interface/common.interface";
import { IUser } from "../interface/request";
import { IServiceLayerResponse, IRepositoryLayerResponse } from "../interface/response";
import { User } from "../modal/schemas";

export default class ServiceLayer implements IAuthService {
    constructor() {
        this.createNewUser = this.createNewUser.bind(this);
    }
    deleteUser = async () => { };
    updateUser = async () => { };
    updateOneUser = async () => { };

    createNewUser = async (args: IUser): Promise<IRepositoryLayerResponse> => {
        let response: IServiceLayerResponse;
        try {

            const payload: IUser = {
                firstName: 'Rajat',
                lastName: 'Kotian',
                mobile: '9999999999',
                countryCode: '+91',
                email: "rajat.kotian@gmail.com",
                password: "123123123123",
                isEmailVerified: false,
                isMobileVerified: false,
                isActive: false,
                createdBy: "507f191e810c19729de860ea",
            }
            const user = await new User(payload).save();
            console.log("USER", user)
            response = { success: true }
        } catch (error) {
            Logger.error("This is an error log", JSON.stringify(error));
            response = { success: false }

        }
        return response
    }

}