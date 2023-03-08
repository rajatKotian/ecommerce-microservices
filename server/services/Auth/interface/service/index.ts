import { Request } from "express";
import { IUser } from "../request";
import { IServiceLayerResponse } from "../response";

export interface IAuthService {
    registerNewUser(req: Request, args: IUser): Promise<IServiceLayerResponse>
    loginUser(req: Request, args: { email: string, password: string }): Promise<IServiceLayerResponse>
    getProfileDetails(req: Request): Promise<IServiceLayerResponse>
    updateProfileDetails(req: Request, args: IUser): Promise<IServiceLayerResponse>
};