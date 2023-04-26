import assert from "assert";
import { APIError } from "../../../utils/responseHandlers/error.helper";
import { IRepository } from "../../../utils/interface/repository";
import { ERROR_MESSAGES, HTTP_ERROR_STATUS_CODE, HTTP_SUCCESS_STATUS_CODE, LOGGER_CONSTANTS } from "../../../utils/constants";
import Logger from "../../../utils/helpers/Logger";
import { Request } from "express";
import { initiateSession } from "../utils/helpers/session";
import { ICartService } from "../interface/service";
import CartRepository from "../repository/cart.repository";

export default class CartServiceLayer implements ICartService {
    private cartRepository: any;
    constructor() {
        this.cartRepository = new CartRepository();
    }

}
