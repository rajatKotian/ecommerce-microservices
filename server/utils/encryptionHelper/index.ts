import { Cipher } from 'crypto';
import cryptoJS from 'crypto-js';
import { AppConfig } from '../../config';
import { IEncryption } from '../interface';

export class Encrypt implements IEncryption {

    encrypt(value: string): string {
        const key = AppConfig.get('AESkeys:key')
        return cryptoJS.AES.encrypt(value, key).toString();
    }
    decrypt(value: string): string {
        const key = AppConfig.get('AESkeys:key')
        return cryptoJS.AES.decrypt(value, key).toString(cryptoJS.enc.Utf8);
    }

}