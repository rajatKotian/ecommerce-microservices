import assert from "assert";
import { APIError } from "../../../utils/responseHandlers/error.helper";
import { IRepository } from "../../../utils/interface/repository";
import { ERROR_MESSAGES, LOGGER_CONSTANTS } from "../../../utils/constants";
import Logger from "../../../utils/helpers/Logger";
import { Request } from "express";
import { IInventoryService } from "../interface/service";
import InventoryRepository from "../repository/inventory.repository";

export default class InventoryServiceLayer implements IInventoryService {
    private inventoryRepository: any;
    constructor() {
        this.inventoryRepository = new InventoryRepository();
    }

    listProductsService = (params: {
        skip: number,
        limit: number;
    }) => {

    };
}
