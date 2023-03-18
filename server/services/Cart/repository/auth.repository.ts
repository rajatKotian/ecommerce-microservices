import assert from "assert";
import { ObjectId, Types } from "mongoose";
import { IRepository } from "../../../utils/interface/repository";
import { IRepositoryLayerResponse } from "../../../utils/interface/response";
import { User } from "../modal/schemas";

export default class CartRepository implements IRepository {
    constructor() {
        this.create = this.create.bind(this);
    }

    // TODO: Replace all the parameter's type any with appropiate interface
    create = async (args: any): Promise<any> => new User(args).save();

    exists = async (args: any): Promise<any> => {
        const user: any[] = await User.find(args)
        return user.length !== 0
    };

    delete = async (args: ObjectId[]): Promise<any> => {
        return { success: true };
    }
    update = async (query: any, payload: any): Promise<IRepositoryLayerResponse | null> => {
        return User.findOneAndUpdate(query, payload)
    };

    updateOne = async (query: string | any, payload: any, options?: {}): Promise<IRepositoryLayerResponse | null> => {
        if (typeof query == 'string') {
            return User.findByIdAndUpdate(query, payload, options)
        } else {
            return User.findOneAndUpdate(query, payload, options)
        }
    };
    getAll = async (query: any): Promise<IRepositoryLayerResponse> => {
        return { success: true };
    };

    getOne = async (query: any): Promise<any> => User.findOne(query)
}