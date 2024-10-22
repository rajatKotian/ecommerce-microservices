import { ObjectId } from "mongoose";
import { IRepository } from "../../../utils/interface/repository";
import { IRepositoryLayerResponse } from "../../../utils/interface/response";
import { Product } from "../modal";
import { IProduct } from "../interface/model";

export default class InventoryRepository implements IRepository {
    create = async (args: Partial<IProduct>) => {
        return new Product(args).save();
    };
    delete = async (args: ObjectId[]) => {
        return { success: true };
    };
    exists = async (query: Partial<IProduct>) => {
        const product: Partial<IProduct>[] = await Product.find(query);
        return product.length !== 0;
    };

    update = async (query: Partial<IProduct>, payload: Partial<IProduct>, options?: IProduct) => {
        return Product.findOneAndUpdate(query, payload);
    };

    updateOne = async (query: Partial<IProduct> | string, payload: Partial<IProduct>, options?: IProduct) => {
        if (typeof query == 'string') {
            return Product.findByIdAndUpdate(query, payload, options);
        } else {
            return Product.findOneAndUpdate(query, payload, options);
        }
    };
    getAll = async (query: Partial<IProduct>): Promise<IRepositoryLayerResponse> => {
        return { success: true };
    };

    getOne = async (query: Partial<IProduct>): Promise<any> => Product.findOne(query);
}