import { ObjectId } from "mongoose";
import { IAuthRepository } from "../interface/repository";
import { IUser } from "../interface/request";
import { IRepositoryLayerResponse } from "../interface/response";
import { User } from "../modal/schemas";

export default class AuthRepository implements IAuthRepository {
    constructor() {
        this.createUser = this.createUser.bind(this);
    }

    createUser = async (args: IUser): Promise<IRepositoryLayerResponse> => {
        try {
            const user = await new User(args).save();
            return { success: true, data: user };
        } catch (error) {
            return { success: false, error };
        }

    }

    deleteUser = async (args: ObjectId[]): Promise<IRepositoryLayerResponse> => {
        return { success: true };
    }
    updateUser = async (query: IUser, payload: IUser): Promise<IRepositoryLayerResponse> => {
        return { success: true };
    };
    updateOneUser = async (args: ObjectId[], payload: IUser): Promise<IRepositoryLayerResponse> => {
        return { success: true };
    };
    getAll = async (query: IUser): Promise<IRepositoryLayerResponse> => {
        return { success: true };
    };
    getOne = async (args: ObjectId): Promise<IRepositoryLayerResponse> => {
        return { success: true };
    }

}