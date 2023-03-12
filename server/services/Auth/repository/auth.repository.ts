import assert from "assert";
import { ObjectId, Types } from "mongoose";
import { IRepository } from "../../../utils/interface/repository";
import { IRepositoryLayerResponse } from "../../../utils/interface/response";
import { IUser } from "../interface/request";
import { User } from "../modal/schemas";

export default class AuthRepository implements IRepository {
    constructor() {
        this.create = this.create.bind(this);
    }

    create = async (args: IUser): Promise<any> => new User(args).save();

    exists = async (args: IUser): Promise<any> => {
        const user: IUser[] = await User.find(args)
        return user.length !== 0
    };

    delete = async (args: ObjectId[]): Promise<any> => {
        return { success: true };
    }
    update = async (query: IUser, payload: IUser): Promise<IRepositoryLayerResponse | null> => {
        return User.findOneAndUpdate(query, payload)
    };

    updateOne = async (query: string | IUser, payload: IUser, options?: {}): Promise<IRepositoryLayerResponse | null> => {
        if (typeof query == 'string') {
            return User.findByIdAndUpdate(query, payload, options)
        } else {
            return User.findOneAndUpdate(query, payload, options)
        }
    };
    getAll = async (query: IUser): Promise<IRepositoryLayerResponse> => {
        return { success: true };
    };

    getOne = async (query: IUser): Promise<any> => User.findOne(query)
}