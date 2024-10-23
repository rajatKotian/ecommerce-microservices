import { Request } from "express";
import { IServiceLayerResponse } from "../../../../utils/interface/response";
import { IUserModel } from "../model";

export interface IAuthService {
    registerNewUser(req: Request, args: IUserModel): Promise<IServiceLayerResponse>
    loginUser(req: Request, args: { email: string, password: string }): Promise<IServiceLayerResponse>
    getProfileDetails(req: Request): Promise<IServiceLayerResponse>
    updateProfileDetails(req: Request, args: IUserModel): Promise<IServiceLayerResponse>;
};