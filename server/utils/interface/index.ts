import { Router } from "express";
import { ServiceType } from "../constants";

export interface IEncryption {
    encrypt(value: string): string;
    decrypt(value: string): string;
}
export interface INodeMailerEmailObject {
    to: string;
    subject: string;
    text: string;
}

export interface IAPIService {
    type: ServiceType,
    endpoint: string,
    body: string,
    headers: string,
    params: string
}


export interface Controller {
    type: ServiceType,
    endpoint: string,
    body: string,
    headers: string,
    params: string;
}

export interface IService {

}

export abstract class IController {
    abstract service: IService;
}


export abstract class IRouter {
    protected abstract router: Router;
    protected abstract controller: IController;
    initializeRoutes(): Router {
        return this.router;
    }
}
