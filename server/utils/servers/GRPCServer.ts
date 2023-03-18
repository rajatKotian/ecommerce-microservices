import { Server, ServerCredentials, loadPackageDefinition } from '@grpc/grpc-js'
import { AppConfig } from '../../config';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from '../../../proto/pb/auth'
import path from 'path';
import Logger from '../helpers/Logger';
import { AuthServiceHandlers } from "../../../proto/pb/auth/AuthService";


export class GRPCServer {
    private static server: GRPCServer;

    private port = AppConfig.get('grpc:port')
    private PROTO_FILE: string = '../../../proto/services/auth/v1/auth.proto'
    private packageDef = protoLoader.loadSync(path.resolve(__dirname, this.PROTO_FILE))
    private grpcObject = (loadPackageDefinition(this.packageDef) as unknown) as ProtoGrpcType
    private authPackage = this.grpcObject.auth;

    private constructor() {
        const server = new Server();
        server.addService(this.authPackage.AuthService.service, {
            "GetUser": (req, res) => {
                console.log(req, res);
            }
        } as AuthServiceHandlers)
        server.bindAsync(`0.0.0.0:${this.port}`, ServerCredentials.createInsecure(), (err, port) => {
            if (err) {
                Logger.error(err)
            }
            server.start();
            Logger.info(`Grpc Server started at port: ${port}`);
        })

    }


    public static startServer(): GRPCServer {
        if (!this.server) {
            this.server = new GRPCServer();
        }
        return this.server;
    }

}




