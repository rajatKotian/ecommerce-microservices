import { ObjectId } from "mongoose"
import { IUser } from "../request"
import { IRepositoryLayerResponse } from "../response"

export interface IRepository {
    create: (args: IUser) => Promise<any>
    delete: (args: ObjectId[]) => Promise<IRepositoryLayerResponse>
    update: (query: IUser, payload: IUser) => Promise<IRepositoryLayerResponse>
    updateOne: (args: ObjectId[], payload: IUser) => Promise<IRepositoryLayerResponse>
    getOne: (query: IUser) => Promise<any>
    getAll: (query: IUser) => Promise<IRepositoryLayerResponse>
};