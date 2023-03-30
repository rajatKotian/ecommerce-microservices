import { Request } from "express";
import { IRepository } from "../../../../utils/interface/repository";
import { IServiceLayerResponse } from "../../../../utils/interface/response";
import { GRPCClient } from "../../utils/servers/GRPCClient";
import { IUser } from "../request";

export interface IAuthService {
    registerNewUser(req: Request, args: IUser): Promise<IServiceLayerResponse>
    loginUser(req: Request, args: { email: string, password: string }): Promise<IServiceLayerResponse>
    getProfileDetails(req: Request): Promise<IServiceLayerResponse>
    updateProfileDetails(req: Request, args: IUser): Promise<IServiceLayerResponse>
};

export interface IGRPCController {
    grpcClient: GRPCClient;
};

export interface IGRPCService {
    grpcServiceRepository: IRepository;
};