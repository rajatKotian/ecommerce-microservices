export interface IEncryption {
    encrypt(value: string): string;
    decrypt(value: string): string;
}
export interface INodeMailerEmailObject {
    to: string;
    subject: string;
    text: string;
}
