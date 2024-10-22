import { ObjectId } from "mongoose"
import { IUser } from "../../../services/Auth/interface/request";
import { IRepositoryLayerResponse } from "../response"

export interface IRepository {
    create: (args: Partial<IUser>) => Promise<any>
    delete: (args: ObjectId[]) => Promise<IRepositoryLayerResponse>
    exists: (query: Partial<IUser>) => Promise<any>;
    update: (query: Partial<IUser>, payload: Partial<IUser>, options?: any) => Promise<IRepositoryLayerResponse | null>;
    updateOne: (query: string | Partial<IUser>, payload: Partial<IUser>, options?: any) => Promise<IRepositoryLayerResponse | null>;
    getOne: (query: Partial<IUser>) => Promise<any>;
    getAll: (query: Partial<IUser>) => Promise<IRepositoryLayerResponse>;
};