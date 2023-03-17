import { Server, ServerCredentials, loadPackageDefinition } from '@grpc/grpc-js'
import { AppConfig } from '../../config';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from '../../../pb/auth'
import path from 'path';



export class GRPCServer {
    private static server: GRPCServer;

    private port = AppConfig.get('grpc:port')
    private PROTO_FILE: string = '../../../pb/services/auth/v1/auth.proto'
    private packageDef = protoLoader.loadSync(path.resolve(__dirname, this.PROTO_FILE))
    private grpcObject = (loadPackageDefinition(this.packageDef) as unknown) as ProtoGrpcType
    private authPackage = this.grpcObject.auth;

    constructor() {

    }


    public static startServer(): GRPCServer {
        if (!this.server) {
            this.server = new GRPCServer();
        }

        return this.server;
    }

}




