import mongoose from "mongoose";
import { User } from "../modal/schemas";
import { IUser } from "./request";
import { IRepositoryLayerResponse } from "./response";


export interface IAuthService {
    createNewUser: (args: any) => Promise<IRepositoryLayerResponse>
};