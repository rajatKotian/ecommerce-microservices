import assert from "assert";
import { ObjectId, Types } from "mongoose";
import { IRepository } from "../../../utils/interface/repository";
import { IRepositoryLayerResponse } from "../../../utils/interface/response";
import { User } from "../modal";
import { IUserModel } from "../interface/model";

export default class AuthRepository implements IRepository {
    constructor() {
        this.create = this.create.bind(this);
    }

    create = async (args: Partial<IUserModel>): Promise<any> => new User(args).save();

    exists = async (args: Partial<IUserModel>): Promise<any> => {
        const user: Partial<IUserModel>[] = await User.find(args)
        return user.length !== 0
    };

    delete = async (args: ObjectId[]): Promise<any> => {
        return { success: true };
    }
    update = async (query: Partial<IUserModel>, payload: Partial<IUserModel>): Promise<IRepositoryLayerResponse | null> => {
        return User.findOneAndUpdate(query, payload)
    };

    updateOne = async (query: string | Partial<IUserModel>, payload: Partial<IUserModel>, options?: {}): Promise<IRepositoryLayerResponse | null> => {
        if (typeof query == 'string') {
            return User.findByIdAndUpdate(query, payload, options)
        } else {
            return User.findOneAndUpdate(query, payload, options)
        }
    };
    getAll = async (query: Partial<IUserModel>): Promise<IRepositoryLayerResponse> => {
        return { success: true };
    };

    getOne = async (query: Partial<IUserModel>): Promise<any> => User.findOne(query);
}