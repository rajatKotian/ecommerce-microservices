import * as grpc from '@grpc/grpc-js';
import AuthRepository from '../repository/auth.repository';
import { IRepository } from '../../../utils/interface/repository';
import { GetUserRequest__Output } from '../proto/pb/auth/GetUserRequest';
import { GRPC_ERROR_CODES, GRPC_ERROR_MESSAGES } from '../../../utils/constants';
import { GetUserResponse } from '../proto/pb/auth/GetUserResponse';
import { IGRPCController } from '../interface/service';
import { GRPCClient } from '../utils/servers/GRPCClient';
import { Request, Response } from 'express';

export default class GRPCController {

    test = async (req: Request, res: Response) => {
        GRPCClient.getClientInstance().GetUser(
            {
                id: req.params.id,
            },
            (err, data) => {
                if (err) {
                    return res.status(400).json({
                        status: "fail",
                        message: err.message
                    })
                }
                return res.status(200).json({
                    status: "success",
                    data: {
                        email: data?.email,
                        firstName: data?.firstName,
                        lastName: data?.lastName
                    } 
                })
            }
        );

    }
};