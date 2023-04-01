import * as grpc from '@grpc/grpc-js';
import AuthRepository from '../repository/auth.repository';
import { IRepository } from '../../../utils/interface/repository';
import { GetUserRequest, GetUserRequest__Output } from '../proto/pb/auth/GetUserRequest';
import { GRPC_ERROR_CODES, GRPC_ERROR_MESSAGES } from '../../../utils/constants';
import { GetUserResponse } from '../proto/pb/auth/GetUserResponse';
import { IGRPCService } from '../interface/service';
import { GRPCClient } from '../utils/servers/GRPCClient';

export default class GRPCService implements IGRPCService {
    grpcServiceRepository: IRepository

    constructor() {
        this.grpcServiceRepository = new AuthRepository();
    }

    getUserHandler = async (
        req: grpc.ServerUnaryCall<GetUserRequest, GetUserResponse>,
        res: grpc.sendUnaryData<GetUserResponse>
    ) => {
        try {
            const user = await this.grpcServiceRepository.getOne({
                _id: req.request.id,
            })
            res(null,
                {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                }
            )
        } catch (err: any) {
            if (err.code === GRPC_ERROR_CODES.P2002) {
                res({
                    code: grpc.status.INVALID_ARGUMENT,
                    message: GRPC_ERROR_MESSAGES.INVALID_REQUEST,
                });
            }
            res({
                code: grpc.status.INTERNAL,
                message: err.message,
            });
        }
    };
};