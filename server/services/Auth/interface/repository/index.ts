import { ObjectId } from "mongoose"
import { IUser } from "../request"
import { IRepositoryLayerResponse } from "../response"

export interface IAuthService {
    createUser: (args: IUser) => IRepositoryLayerResponse,
    deleteUser: (args: ObjectId[]) => IRepositoryLayerResponse,
    updateUser: (query: IUser, payload: IUser) => IRepositoryLayerResponse
    updateOneUser: (args: ObjectId[],) => IRepositoryLayerResponse
};