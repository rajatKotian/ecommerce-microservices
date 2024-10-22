import assert from "assert";
import { ObjectId, Types } from "mongoose";
import { IRepository } from "../../../utils/interface/repository";
import { IRepositoryLayerResponse } from "../../../utils/interface/response";
import { IUser } from "../interface/request";
import { User } from "../modal";

export default class AuthRepository implements IRepository {
    constructor() {
        this.create = this.create.bind(this);
    }

    create = async (args: Partial<IUser>): Promise<any> => new User(args).save();

    exists = async (args: Partial<IUser>): Promise<any> => {
        const user: Partial<IUser>[] = await User.find(args)
        return user.length !== 0
    };

    delete = async (args: ObjectId[]): Promise<any> => {
        return { success: true };
    }
    update = async (query: Partial<IUser>, payload: Partial<IUser>): Promise<IRepositoryLayerResponse | null> => {
        return User.findOneAndUpdate(query, payload)
    };

    updateOne = async (query: string | Partial<IUser>, payload: Partial<IUser>, options?: {}): Promise<IRepositoryLayerResponse | null> => {
        if (typeof query == 'string') {
            return User.findByIdAndUpdate(query, payload, options)
        } else {
            return User.findOneAndUpdate(query, payload, options)
        }
    };
    getAll = async (query: Partial<IUser>): Promise<IRepositoryLayerResponse> => {
        return { success: true };
    };

    getOne = async (query: Partial<IUser>): Promise<any> => User.findOne(query);
}