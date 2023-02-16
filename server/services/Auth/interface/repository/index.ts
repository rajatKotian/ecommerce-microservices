import { ObjectId } from "mongoose"
import { IUser } from "../request"
import { IRepositoryLayerResponse } from "../response"

export interface IAuthRepository {
    createUser: (args: IUser) => Promise<IRepositoryLayerResponse>
    deleteUser: (args: ObjectId[]) => Promise<IRepositoryLayerResponse>
    updateUser: (query: IUser, payload: IUser) => Promise<IRepositoryLayerResponse>
    updateOneUser: (args: ObjectId[], payload: IUser) => Promise<IRepositoryLayerResponse>
    getOne: (args: ObjectId) => Promise<IRepositoryLayerResponse>
    getAll: (query: IUser) => Promise<IRepositoryLayerResponse>
};