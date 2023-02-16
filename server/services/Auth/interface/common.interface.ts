import mongoose from "mongoose";
import { User } from "../modal/schemas";
import { IUser } from "./request";


export interface IAuthService {
    createNewUser: (args: any) => { success: true }
    deleteUser: () => {}
    updateUser: () => {}
    updateOneUser: () => {}
};