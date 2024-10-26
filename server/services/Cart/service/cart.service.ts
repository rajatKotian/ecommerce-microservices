import assert from "assert";
import { APIError } from "../../../utils/responseHandlers/error.helper";
import { IRepository } from "../../../utils/interface/repository";
import { ERROR_MESSAGES, LOGGER_CONSTANTS } from "../../../utils/constants";
import Logger from "../../../utils/helpers/Logger";
import { Request } from "express";
import InventoryRepository from "../repository/inventory.repository";
import { IServiceLayerResponse } from "../../../utils/interface/response";
import { IService } from "../../../utils/interface";

export default class InventoryServiceLayer implements IService {
    private inventoryRepository: any;
    constructor() {
        this.inventoryRepository = new InventoryRepository();
    }

    listProductsService = async (params: {
        limit: number,
        skip?: number,
    }): Promise<IServiceLayerResponse> => {
        try {
            const data = {};

            const response: IServiceLayerResponse = {
                success: false,
                httpCode: 200,
                response: data
            };

            return response;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    };
}
