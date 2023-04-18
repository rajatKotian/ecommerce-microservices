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