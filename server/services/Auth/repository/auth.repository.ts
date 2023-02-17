import assert from "assert";
import { ObjectId, Types } from "mongoose";
import { IRepository } from "../interface/repository";
import { IUser } from "../interface/request";
import { IRepositoryLayerResponse } from "../interface/response";
import { User } from "../modal/schemas";

export default class AuthRepository implements IRepository {
    constructor() {
        this.create = this.create.bind(this);
    }

    create = async (args: IUser): Promise<any> => new User(args).save();

    delete = async (args: ObjectId[]): Promise<IRepositoryLayerResponse> => {
        return { success: true };
    }
    update = async (query: IUser, payload: IUser): Promise<IRepositoryLayerResponse> => {
        return { success: true };
    };
    updateOne = async (args: ObjectId[], payload: IUser): Promise<IRepositoryLayerResponse> => {
        return { success: true };
    };
    getAll = async (query: IUser): Promise<IRepositoryLayerResponse> => {
        return { success: true };
    };
    getOne = async (args: ObjectId): Promise<IRepositoryLayerResponse> => {
        return { success: true };
    }

}