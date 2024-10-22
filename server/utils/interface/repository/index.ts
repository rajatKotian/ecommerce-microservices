import { ObjectId } from "mongoose";
import { IRepositoryLayerResponse } from "../response"
import { Interface } from "readline";

export interface IRepository {
    create: (args: Partial<any>) => Promise<any>
    delete: (args: ObjectId[]) => Promise<IRepositoryLayerResponse>
    exists: (query: Partial<any>) => Promise<any>;
    update: (query: Partial<any>, payload: Partial<any>, options?: any) => Promise<IRepositoryLayerResponse | null>;
    updateOne: (query: string | Partial<any>, payload: Partial<any>, options?: any) => Promise<IRepositoryLayerResponse | null>;
    getOne: (query: Partial<any>) => Promise<any>;
    getAll: (query: Partial<any>) => Promise<IRepositoryLayerResponse>;
};