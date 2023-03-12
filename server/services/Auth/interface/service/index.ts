import { Request } from "express";
import { IServiceLayerResponse } from "../../../../utils/interface/response";
import { IUser } from "../request";

export interface IAuthService {
    registerNewUser(req: Request, args: IUser): Promise<IServiceLayerResponse>
    loginUser(req: Request, args: { email: string, password: string }): Promise<IServiceLayerResponse>
    getProfileDetails(req: Request): Promise<IServiceLayerResponse>
    updateProfileDetails(req: Request, args: IUser): Promise<IServiceLayerResponse>
};