import { ObjectId } from "mongoose";
import { IAuthRepository } from "../interface/repository";
import { IUser } from "../interface/request";
import { IRepositoryLayerResponse } from "../interface/response";

export default class RepositoryLayer implements IAuthRepository {

    deleteUser = async (args: ObjectId[]): Promise<IRepositoryLayerResponse> => {
        return { success: true };
    }
    updateUser = async (query: IUser, payload: IUser): Promise<IRepositoryLayerResponse> => {
        return { success: true };
    };
    updateOneUser = async (args: ObjectId[], payload: IUser): Promise<IRepositoryLayerResponse> => {
        return { success: true };
    };
    createUser = async (args: IUser): Promise<IRepositoryLayerResponse> => {
        return { success: true };
    }

}