import { ObjectId } from "mongoose"
import { IUser } from "../../../services/Auth/interface/request"
import { IRepositoryLayerResponse } from "../response"

export interface IRepository {
    create: (args: IUser) => Promise<any>
    delete: (args: ObjectId[]) => Promise<IRepositoryLayerResponse>
    exists: (query: IUser) => Promise<any>
    update: (query: IUser, payload: IUser, options?: any) => Promise<IRepositoryLayerResponse | null>
    updateOne: (query: string | IUser, payload: IUser, options?: any) => Promise<IRepositoryLayerResponse | null>
    getOne: (query: IUser) => Promise<any>
    getAll: (query: IUser) => Promise<IRepositoryLayerResponse>
};