import { Server, ServerCredentials, loadPackageDefinition } from '@grpc/grpc-js'
import { AppConfig } from '../../../../config';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import Logger from '../../../../utils/helpers/Logger';
import { ProtoGrpcType } from '../../proto/pb/auth';
import { AuthServiceHandlers } from '../../proto/pb/auth/AuthService';
import { GRPCController } from '../../controllers';


export class GRPCServer {

    private static server: GRPCServer;

    private grpcController: GRPCController;

    private port = AppConfig.get('grpc:authService:port')
    private PROTO_FILE: string = '../../proto/services/auth/v1/auth.proto'
    private packageDef = protoLoader.loadSync(path.resolve(__dirname, this.PROTO_FILE))
    grpcObjectClient = (loadPackageDefinition(this.packageDef) as unknown) as ProtoGrpcType
    private authPackage = this.grpcObjectClient.auth;

    private constructor() {
        const server = new Server();
        this.grpcController = new GRPCController();
        server.addService(this.authPackage.AuthService.service, {
            GetUser: (req: any, res: any) => this.grpcController.getUserHandler(req, res)
        } as AuthServiceHandlers)
        server.bindAsync(
            `0.0.0.0:${this.port}`,
            ServerCredentials.createInsecure(),
            (err, port) => {
                if (err) {
                    Logger.error(err)
                }
                server.start();
                Logger.info(`Authentication service GRPC Server started at port: ${port}`);
            })
    }


    public static startServer(): GRPCServer {
        if (!this.server) {
            this.server = new GRPCServer();
        }
        return this.server;
    }

}




