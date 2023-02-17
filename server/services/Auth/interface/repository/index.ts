import { ObjectId } from "mongoose"
import { IUser } from "../request"
import { IRepositoryLayerResponse } from "../response"

export interface IRepository {
    create: (args: IUser) => Promise<IRepositoryLayerResponse>
    delete: (args: ObjectId[]) => Promise<IRepositoryLayerResponse>
    update: (query: IUser, payload: IUser) => Promise<IRepositoryLayerResponse>
    updateOne: (args: ObjectId[], payload: IUser) => Promise<IRepositoryLayerResponse>
    getOne: (args: ObjectId) => Promise<IRepositoryLayerResponse>
    getAll: (query: IUser) => Promise<IRepositoryLayerResponse>
};