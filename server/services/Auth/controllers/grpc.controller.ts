import * as grpc from '@grpc/grpc-js';
import AuthRepository from '../repository/auth.repository';
import { IRepository } from '../../../utils/interface/repository';
import { GetUserRequest__Output } from '../proto/pb/auth/GetUserRequest';
import { GRPC_ERROR_CODES, GRPC_ERROR_MESSAGES, HTTP_ERROR_STATUS_CODE, HTTP_SUCCESS_STATUS_CODE } from '../../../utils/constants';
import { GetUserResponse } from '../proto/pb/auth/GetUserResponse';
import { IGRPCController } from '../interface/service';
import { GRPCClient } from '../utils/servers/GRPCClient';
import { APIError } from '../../../utils/responseHandlers/error.helper';
import { APISuccess } from '../../../utils/responseHandlers/success.helper';
import { Request, Response } from 'express';
import { AuthServiceClient } from '../proto/pb/auth/AuthService';

export default class GRPCController {
    private clientInstance: AuthServiceClient = GRPCClient.getClientInstance();
    test = async (req: Request, res: Response) => {
        const id: string = req.query.id as string;
        this.clientInstance.GetUser(
            {
                id
            },
            (err, data) => {
                if (err) {
                    const error: APIError = new APIError(
                        false,
                        HTTP_ERROR_STATUS_CODE.BAD_REQUEST,
                        true,
                        err.message
                    );
                    return res.status(error.httpCode).send(error);
                }
                const response: APISuccess = new APISuccess(
                    true,
                    HTTP_SUCCESS_STATUS_CODE.ACCEPTED,
                    data
                )
                return res.status(response.httpCode).send(response)
            }
        );

    }
};