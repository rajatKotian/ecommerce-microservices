import assert from "assert";
import { APIError } from "../../../utils/responseHandlers/error.helper";
import { IRepository } from "../../../utils/interface/repository";
import { ERROR_MESSAGES, LOGGER_CONSTANTS } from "../../../utils/constants";
import Logger from "../../../utils/helpers/Logger";
import { Request } from "express";
import { IServiceLayerResponse } from "../../../utils/interface/response";
import { IService } from "../../../utils/interface";
import CartRepository from "../repository/cart.repository";

export default class CartServiceLayer implements IService {
    private cartRepository = new CartRepository();

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
